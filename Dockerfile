FROM node:20.12.0-alpine AS base
FROM base AS install_dependencies
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM base AS verify_app
WORKDIR /app
COPY --from=install_dependencies /app /app
COPY src src
COPY *.json .
COPY *.ts .
RUN echo "hallo welt"
RUN npm run verify

FROM base AS build
WORKDIR /app
COPY --from=verify_app /app /app
RUN npm run build

FROM base AS publish
WORKDIR /app
COPY --from=build /app /app
RUN npm publish --dry-run

