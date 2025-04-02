# Build the frontend
FROM node:22 AS builder

WORKDIR /app

COPY . /app

RUN npm install \
  && npm run build --frozen-lockfile

# Build the backend
FROM python:3.13

LABEL version="4.0.0"

LABEL org.opencontainers.image.authors="qww"

WORKDIR /app

COPY --from=builder /app /app

# Install pipenv and dependencies
RUN pip install pipenv \
  && pipenv install --deploy --ignore-pipfile

EXPOSE 5000

CMD ["pipenv", "run", "gunicorn", "-b", "0.0.0.0:5000", "server:app"]