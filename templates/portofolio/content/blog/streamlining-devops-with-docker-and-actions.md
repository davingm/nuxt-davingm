---
title: "Minimalist Docker & CI/CD Pipelines for Modern Web Apps"
description: "Achieving ultra-fast builds and bulletproof reliability with GitHub Actions, Vitest, and lightweight Nginx containers."
date: "2026-07-28"
tags: ["DevOps", "Docker", "CI/CD", "GitHub Actions"]
readTime: "6 min read"
featured: true
author:
  name: "Davin"
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
  role: "Lead Maintainer"
---

# Minimalist Docker & CI/CD Pipelines for Modern Web Apps

A modern developer portfolio or frontend web app should have standard DevOps pipelines integrated from the very first commit.

Here is the exact setup we employ for continuous integration and automated container generation.

## 1. Multi-Stage Docker Build

Using Alpine Linux and multi-stage builds reduces Docker image size from 800MB to under 25MB:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm generate

# Production stage
FROM nginx:alpine
COPY --from=builder /app/.output/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 2. GitHub Actions Workflow

The CI workflow validates linting with Biome, unit tests with Vitest, and verifies that the SSG build compiles without errors:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm test:run
      - run: pnpm generate
```

## Conclusion

Automating verification gives developers total confidence when shipping updates and contributing to open source repositories.
