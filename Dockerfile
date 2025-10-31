# syntax=docker/dockerfile:1

# Use official Bun image (includes Node, npm, curl, bash)
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy package manifests and install deps
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy rest of project and build
COPY . .
RUN bun run build

# Environment setup
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Start Astro preview server via Bun
CMD ["bun", "run", "preview"]
