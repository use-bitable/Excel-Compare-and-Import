import os
from time import time
from .constants import LOG_ROOT_DIR_PATH


def get_log_file_path(
    tenant_key: str = None,
    base_id: str = None,
    user_id: str = None,
    task_id: str = None,
):
    path_list = list(
        filter(
            None,
            [
                LOG_ROOT_DIR_PATH,
                tenant_key,
                user_id,
                base_id,
                f"{task_id}_{int(round(time() * 1000))}.log",
            ],
        )
    )
    return os.path.join(*path_list)
