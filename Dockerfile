FROM node:20.12.2-alpine AS base
FROM base AS install_dependencies
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM base AS verify
WORKDIR /app
COPY --from=install_dependencies /app /app
COPY src src
COPY *.json .
COPY *.ts .
RUN npm run verify

FROM base AS build
WORKDIR /app
COPY --from=verify /app /app
RUN npm run build

FROM base
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY docker-entrypoint.sh /bin/entrypoint.sh
ENTRYPOINT ["/bin/entrypoint.sh"]

