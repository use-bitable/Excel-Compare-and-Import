FROM python:3.12-slim

LABEL version="4.0.0"

LABEL org.opencontainers.image.authors="qww"

WORKDIR /app

COPY . /app

# Install pipenv and dependencies
RUN pip install pipenv \
  && pipenv install --deploy --ignore-pipfile

EXPOSE 5000

CMD ["pipenv", "run", "uvicorn", "-b", "0.0.0.0:5000", "app:app"]