import os


def get_file_type(path):
    type = os.path.splitext(path)[-1]
    if isinstance(type, str):
        return type.lower()
    return None
