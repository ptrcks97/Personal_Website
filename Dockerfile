# ---------- Stage 1: Build ----------
FROM node:24-alpine AS build
WORKDIR /app

# Abhängigkeiten zuerst – nutzt den Docker-Layer-Cache
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---------- Stage 2: Auslieferung ----------
# nginx ohne Root-Rechte, lauscht auf Port 8080
FROM nginxinc/nginx-unprivileged:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/patrick-os/browser /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
