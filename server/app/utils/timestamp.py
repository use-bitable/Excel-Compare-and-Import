from datetime import datetime


def timestamp_s_to_ms(timestamp: float) -> int:
    return int(round(timestamp * 1000))


def datetime_to_timestamp_ms(dt: datetime) -> int:
    return timestamp_s_to_ms(dt.timestamp())
