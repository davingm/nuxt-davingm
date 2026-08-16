# Production-ready multi-stage Dockerfile for Nuxt 4 (SSR)
# - Builder stage installs deps and builds application
# - Runner stage installs only production deps, runs as non-root, minimal footprint

FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Use Corepack to manage pnpm and ensure reproducible installs
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy lockfiles first for better caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (dev + prod) for build
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build


FROM node:20-bullseye-slim AS runner
WORKDIR /app

# Environment: production by default
ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root user for security
RUN groupadd -r app && useradd -r -g app -s /sbin/nologin -u 1000 app

# Install pnpm so we can install production-only dependencies during image build
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package manifests and install only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy application build output from builder
COPY --from=builder /app/.output ./.output

# Drop owner to non-root user
RUN chown -R app:app /app
USER app

# Expose port and start the Nuxt server
EXPOSE ${PORT}
CMD ["node", ".output/server/index.mjs"]
