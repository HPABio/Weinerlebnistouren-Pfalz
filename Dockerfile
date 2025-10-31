# syntax=docker/dockerfile:1

FROM oven/bun:1
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

ENV NODE_ENV=production
ENV PORT=4321
EXPOSE 4321

# 👇 Critical for Coolify+Traefik
CMD ["bun", "run", "preview", "--", "--host", "0.0.0.0", "--port", "${PORT}"]