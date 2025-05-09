# Build the frontend
FROM node:22-slim AS builder

WORKDIR /app

COPY . /app/

RUN npm install \
  && npm run build --frozen-lockfile

FROM nginx:1

COPY --from=builder /app/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf