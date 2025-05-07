"""Run the APP"""

import os
import sys
import uvicorn
from getopt import getopt
from dotenv import load_dotenv


def main(argv: list):
    mode = "dev"
    opts, args = getopt(argv, "m:", ["mode="])
    for opt, arg in opts:
        if opt in ("-m", "--mode"):
            mode = arg.lower()
    if mode in ("dev", "alpha", "beta"):
        load_dotenv(f".env.{mode}")
    host = os.getenv("SERVER_HOST", "0.0.0.0")
    port = int(os.getenv("SERVER_PORT", "5000"))
    from server import app
    from server.log import logger

    logger.info(f"Running in {mode} mode")
    # app.run(host=host, port=port, debug=mode == "dev")
    uvicorn.run(
        app,
        host=host,
        port=port,
        log_level="info",
    )
    return mode


if __name__ == "__main__":
    mode = main(sys.argv[1:])
