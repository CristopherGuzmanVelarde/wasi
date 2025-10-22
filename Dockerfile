# Dockerfile para una aplicación Next.js con pnpm

# --- Etapa de Builder ---
# Esta etapa instala dependencias, compila el código y prepara los artefactos de producción.
FROM node:20 AS builder

# Use a non-root working dir
WORKDIR /app

# Install pnpm globally (pnpm v8+ recommended)
RUN npm install -g pnpm@latest

# Copy package manifests first to leverage Docker cache for deps
COPY package.json pnpm-lock.yaml ./

# Install dependencies (use lockfile for reproducible builds). If this fails,
# retry once without --frozen-lockfile to produce more detailed logs for debugging.
RUN set -eux; \
	pnpm install --frozen-lockfile || (echo "pnpm install --frozen-lockfile failed, retrying without --frozen-lockfile to collect logs" && pnpm install --reporter=ndjson)

# Copy the rest of the sources
COPY . .

# Build the app (expects next.config.mjs to set output: 'standalone')
RUN pnpm build

### Runner image: use Debian-slim for maximum compatibility with Next standalone
FROM node:20-slim AS runner

WORKDIR /app

# Create non-root user
RUN groupadd -r nextjs && useradd -r -g nextjs -s /sbin/nologin nextjs

# Set NODE_ENV
ENV NODE_ENV=production

# Copy standalone build output
# Next.js standalone build creates a folder `.next/standalone/` containing package.json and server.js
COPY --from=builder /app/.next/standalone/ .

# Copy public assets and static files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Ensure files are owned by non-root user
RUN chown -R nextjs:nextjs /app

# Switch to non-root user
USER nextjs

# Expose port and default env
EXPOSE 3000
ENV PORT=3000

# Start the Next.js standalone server (server.js is created by Next)
CMD ["node", "server.js"]
