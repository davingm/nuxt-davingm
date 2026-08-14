FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /usr/src/app
RUN addgroup -g 1001 -S nodegroup && adduser -u 1001 -S nodeuser -G nodegroup
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
USER nodeuser
EXPOSE 3000
CMD ["node", "dist/index.js"]
