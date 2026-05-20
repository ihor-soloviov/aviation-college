# syntax=docker/dockerfile:1.7

FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY server.js ./

RUN addgroup -S nodejs && adduser -S filesapi -G nodejs && chown -R filesapi:nodejs /app
USER filesapi

EXPOSE 3001
CMD ["node", "server.js"]
