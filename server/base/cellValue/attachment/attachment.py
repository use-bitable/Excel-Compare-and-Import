#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Attachment value translator

import re
from enum import Enum
from dataclasses import dataclass
from threading import Thread
from queue import Queue
from typing import Sequence, Optional, Callable
from baseopensdk import BaseClient
from requests.exceptions import RequestException
from ..core import TranslatorOption, FieldRole, OnErrorFunc, OnProgressFunc
from ...exception import InvalidFileException
from ...field import FieldType, IField
from ...shared import unique, retry
from ...file import download_file, upload_file_to_base, base_file_checker
from ...token import decode_task_token
from ...const import DEFAULT_SEPARATOR
from ....types import RawValueType, AttachmentValueType, HeadersMapping



class DownloadStatus(Enum):
    """Download status"""
    WAITING = -1
    DOWNLOADING = 0
    SUCCESS = 200
    FAILED = 404


class FileDownLoader(Thread):
    def __init__(self, queue: Queue[Callable]) -> None:
        Thread.__init__(self)
        self.queue = queue

    def run(self):
        while True:
            run = self.queue.get()
            run()
            self.queue.task_done()


@dataclass
class AttachmentCacheItem:
    """Attachment cache item"""
    url: str
    name: Optional[str] = None
    file_token: Optional[str] = None
    file_type: Optional[str] = None
    size: int = 0
    status: DownloadStatus = DownloadStatus.WAITING

    def run(
            self,
            base_client: BaseClient,
            base_id: str,
            on_progress: OnProgressFunc,
            on_error: OnErrorFunc,
            headers: Optional[HeadersMapping] = None
    ):
        """Run"""
        def action():
            try:
                on_progress(f"Downloading {self.url}")
                self.status = DownloadStatus.DOWNLOADING
                file = retry(download_file)(url=self.url, headers=headers)
                self.size = file.content_length
                self.name = file.name
                self.file_type = file.content_type
                self.file_token = retry(upload_file_to_base)(
                    file=file,
                    base_id=base_id,
                    base_client=base_client
                )
                if self.file_token is None:
                    self.status = DownloadStatus.FAILED
                    raise InvalidFileException(f"Failed to upload file {self.url} to base {base_id}")
                self.status = DownloadStatus.SUCCESS
            except (RequestException, InvalidFileException) as e:
                on_error(e)
                self.status = DownloadStatus.FAILED
                return
        return action

attachment_cache: dict[str, dict[str, AttachmentCacheItem]] = {}

def get_attachments(
        ns: str,
        base_client: BaseClient,
        field: IField,
        on_progress: OnProgressFunc,
        on_error: OnErrorFunc
):
    """Get attachments"""
    token_meta = decode_task_token(ns)
    cache = attachment_cache[ns]
    config = field.config.request_config
    headers = config.headers if config is not None else []
    queue = Queue()
    for _ in range(5):
        t = FileDownLoader(queue)
        t.daemon = True
        t.start()
    for item in cache.values():
        if item.status == DownloadStatus.WAITING:
            queue.put(item.run(base_client, token_meta.base_id, on_progress, on_error, headers=headers))
    queue.join()
    return cache

def attachment_cache_to_bitable_value(
        urls: Optional[Sequence[str]],
        _: IField,
        ns: str = None,
):
    """Attachment cache to bitable value"""
    if urls is None:
        return None
    cache = attachment_cache[ns]
    v: list[AttachmentValueType] = []
    for url in urls:
        item = cache.get(url)
        if item is None or item.status != DownloadStatus.SUCCESS:
            continue
        v.append({
            "file_token": item.file_token,
        })
    if len(v) == 0:
        return None
    return v

def attachment_cache_refresh(ns: str):
    """Attachment cache refresh"""
    attachment_cache[ns] = {}

def attachment_cache_reset(ns: str):
    """Attachment cache reset"""
    del attachment_cache[ns]

def attachment_normalize(
    value: RawValueType,
    field: IField,
    ns: Optional[str] = None
):
    """Attachment normalize"""
    if not isinstance(value, str):
        return None
    config = field.config
    separator = DEFAULT_SEPARATOR
    if config is not None:
        separator = config.get("separator", DEFAULT_SEPARATOR)
    values = value.split(separator)
    urls: list[str] = []
    cache = attachment_cache[ns]
    for value in values:
        url = re.match(r'^https?://', value.strip())
        if url is None:
            continue
        url = url.group()
        urls.append(url)
        if url not in cache:
            cache[url] = AttachmentCacheItem(url=url)
    if len(urls) == 0:
        return None
    return unique(urls)


ATTACHMENT_TRANSLATOR = TranslatorOption(
    field_type=FieldType.Attachment,
    roles=[FieldRole.NORMAL, FieldRole.ASYNC],
    normalize=attachment_normalize,
    to_bitable_value=attachment_cache_to_bitable_value,
    reset=attachment_cache_reset,
    refresh=attachment_cache_refresh,
    async_method=get_attachments,
)
