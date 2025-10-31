# syntax=docker/dockerfile:1

############################
# 1) Build stage (Bun)
############################
FROM oven/bun:1 AS build
WORKDIR /app

# Copy manifests first for better layer caching
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy the rest and build
COPY . .
ENV NODE_ENV=production
RUN bun run build

############################
# 2) Runtime stage (static files)
############################
FROM node:20-alpine AS runtime
WORKDIR /srv

# tiny static file server
RUN npm i -g serve@14

# copy built assets
COPY --from=build /app/dist ./dist

# Coolify usually injects PORT; default to 3000 for local runs
ENV PORT=3000
EXPOSE 3000

# start the static server
CMD ["sh", "-lc", "serve -s dist -l ${PORT}"]