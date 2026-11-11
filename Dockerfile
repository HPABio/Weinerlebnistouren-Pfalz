# syntax=docker/dockerfile:1

########## BUILD ##########
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile
COPY . .
# Inhalte & Bilder kommen beim Build aus dem Directus-CMS (Coolify → Build-Variablen).
# Nur in dieser Build-Stage vorhanden, nicht im fertigen Runtime-Image.
ARG CMS_URL
ARG CMS_TOKEN
RUN CMS_URL="$CMS_URL" CMS_TOKEN="$CMS_TOKEN" bun run build

########## RUNTIME ##########
FROM node:20-alpine AS runtime
WORKDIR /srv
RUN npm i -g serve@14
COPY --from=build /app/dist ./dist

ENV PORT=80
EXPOSE 80

CMD ["sh", "-lc", "serve dist -l ${PORT}"]

