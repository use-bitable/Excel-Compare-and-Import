FROM python:3.12-slim

LABEL version="4.0.0"

LABEL org.opencontainers.image.authors="qww"

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:0.7.10 /uv /uvx /bin/

ENV PATH="/app/.venv/bin:$PATH"

ENV UV_COMPILE_BYTECODE=1

ENV UV_LINK_MODE=copy

RUN --mount=type=cache,target=/root/.cache/uv \
  --mount=type=bind,source=uv.lock,target=uv.lock \
  --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
  uv sync --frozen --no-install-project

ENV PYTHONPATH=/app

COPY ./pyproject.toml ./uv.lock /app/

COPY ./app /app

RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync

EXPOSE 5000

CMD ["uvx", "uvicorn", "-b", "0.0.0.0:5000", "app:app"]