from __future__ import annotations
import contextlib
import threading
from abc import abstractmethod
from uuid import uuid4
from typing import TypedDict, Callable, Optional, NotRequired
from enum import Enum
from time import time
from server.utils import timestamp_s_to_ms


class EventMsg(TypedDict):
    """Event message type."""

    en: str
    zh: str


class EventStatus(Enum):
    """Event status enum."""

    SUCCESS = "success"
    FAILED = "failed"
    PENDING = "pending"
    PROCESSING = "processing"
    START = "start"


class EventProgress(TypedDict):
    """Event progress type."""

    total: int
    success: int
    failed: int


class EventData(TypedDict):
    """Event data type."""

    errors: NotRequired[Optional[list[str]]]
    msg: NotRequired[Optional[EventMsg]]
    progress: NotRequired[Optional[EventProgress]]


class Event[D: EventData, CTX: dict]:
    """Event base class"""

    def __init__(
        self,
        id: str,
        status: EventStatus,
        data: Optional[D],
        context: Optional[CTX] = None,
    ):
        self.id = id
        self.data = data
        self.status = status
        self.context = context
        self.timestamp = timestamp_s_to_ms(time())

    @property
    @abstractmethod
    def name(self) -> str: ...

    @property
    @abstractmethod
    def msg_template(self) -> dict[EventStatus, EventMsg]: ...


class EventProgressManager:

    def __init__(self, event_trigger: EventTrigger, total: int):
        self.total = total
        self.success = 0
        self.failed = 0
        self.lock = threading.Lock()
        self.event_trigger = event_trigger

    def update(
        self,
        success: int = 0,
        failed: int = 0,
        msg: Optional[EventMsg] = None,
        errors: Optional[list[str]] = None,
    ):
        """Update progress in multithread."""
        with self.lock:
            self.success += success
            self.failed += failed
            self.event_trigger.process(
                self.success, self.failed, self.total, msg, errors
            )

    def get_progress(self):
        return {
            "total": self.total,
            "success": self.success,
            "failed": self.failed,
        }

    def is_done(self):
        return self.success + self.failed == self.total


class EventTrigger[E: Event[D, CTX], D: EventData, CTX: dict]:
    """Event trigger class."""

    def __init__(
        self,
        event_manager: EventsManager,
        event_class: E,
        context: Optional[CTX] = None,
    ):
        self.event_name = event_class.name
        self.manager = event_manager
        self.event_class = event_class
        self.context = context
        self.context_id = uuid4().hex

    def start(self):
        """Start event."""
        self.trigger(
            EventStatus.START,
            {
                "msg": self.get_msg(EventStatus.START),
            },
        )

    def success(self):
        """Success event."""
        self.trigger(
            EventStatus.SUCCESS,
            {
                "msg": self.get_msg(EventStatus.SUCCESS),
            },
        )

    def failed(self, errors: list[str]):
        """Failed event."""
        self.trigger(
            EventStatus.FAILED,
            {
                "errors": errors,
                "msg": self.get_msg(EventStatus.FAILED),
            },
        )

    def get_progress_manager(self, total: int):
        return EventProgressManager(self, total)

    def process(
        self,
        success: int,
        failed: int,
        total: int,
        msg: Optional[EventMsg] = None,
        errors: Optional[list[str]] = None,
    ):
        """Processing event."""
        self.trigger(
            EventStatus.PROCESSING,
            {
                "progress": (
                    {
                        "success": success,
                        "failed": failed,
                        "total": total,
                    }
                ),
                "msg": self.get_msg(EventStatus.PROCESSING) if msg is None else msg,
                "errors": errors,
            },
        )

    def trigger(self, status: EventStatus, data: D):
        """Trigger event."""
        event = self.event_class(self.context_id, status, data, self.context)
        self.manager.trigger(event)

    def get_msg(self, status: EventStatus) -> EventMsg:
        """Get message."""
        msg_templates = self.event_class.msg_template.get(status)
        if msg_templates is None:
            return None
        return {
            "en": msg_templates["en"].format(**(self.context or {})),
            "zh": msg_templates["zh"].format(**(self.context or {})),
        }


type EventCallback[A] = Callable[[A, Event], None]


class EventsManager[A]:
    """Events manager class."""

    prevents: set[str]

    def __init__(self, app: object):
        self.events: dict[str, list[EventCallback[A]]] = {}
        self.app = app
        self.prevents = set()

    def init(self, app):
        """Init events."""
        self.app = app
        app.events = self

    def register(self, event_name: str, event_func: EventCallback[A]):
        """Register event."""
        if event_name not in self.events:
            self.events[event_name] = []
        self.events[event_name].append(event_func)

    def trigger(self, event: Event):
        """Trigger event."""
        event_name = event.name
        if event_name in self.events and event_name not in self.prevents:
            for event_func in self.events[event_name]:
                event_func(self.app, event)

    def get_events(self):
        return self.events

    def prevent(self, events: list[str] | None = None):
        """Prevent events, if events is None, prevent all."""
        if events is None:
            self.prevents = set(self.events.keys())
        else:
            self.prevents = set(events)

    def allow(self, events: list[str] | None = None):
        """Allow events, if events is None, allow all."""
        if events is None:
            self.prevents = set()
        else:
            self.prevents = self.prevents - set(events)

    @contextlib.contextmanager
    def context[D: EventData, E: Event[D], CTX: dict](
        self,
        event: E,
        context_data: Optional[CTX] = None,
        raise_exceptions: bool = True,
        prevent_events: list[str] | None = None,
    ):
        """Context manager."""
        if prevent_events and len(prevent_events) > 0:
            self.prevent(prevent_events)
        trigger = EventTrigger(self, event, context_data)
        trigger.start()
        try:
            yield trigger
        except Exception as e:
            trigger.failed(errors=[str(e)])
            if raise_exceptions:
                raise e
        else:
            trigger.success()
        finally:
            if prevent_events and len(prevent_events) > 0:
                self.allow(prevent_events)
