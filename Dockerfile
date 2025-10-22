# Dockerfile para una aplicación Next.js con pnpm

# --- Etapa de Builder ---
# Esta etapa instala dependencias, compila el código y prepara los artefactos de producción.
FROM node:20-alpine AS builder

# Instalar pnpm
RUN npm install -g pnpm

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de manifiesto y bloqueo del paquete
COPY package.json pnpm-lock.yaml ./

# Instalar las dependencias de producción
# --prod omite las devDependencies que no son necesarias en producción
RUN pnpm install --prod

# Copiar el resto de los archivos de configuración y del código fuente
# Esto incluye next.config.mjs, tsconfig.json, etc.
COPY . .

# Construir la aplicación Next.js para producción
RUN pnpm build

# --- Etapa de Runner ---
# Esta etapa crea la imagen final y ligera que ejecutará la aplicación.
FROM node:20-alpine AS runner

WORKDIR /app

# Crear un usuario y grupo no root para mejorar la seguridad
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

# Copiar los artefactos de compilación de la etapa anterior
# Copiamos la carpeta .next en modo standalone, que es la salida optimizada
COPY --from=builder /app/.next/standalone ./
# Copiamos también los assets estáticos de la carpeta public y .next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static


# Cambiar la propiedad de los archivos al usuario no root
RUN chown -R nextjs:nextjs .

# Cambiar al usuario no root
USER nextjs

# Exponer el puerto en el que se ejecuta la aplicación Next.js
EXPOSE 3000

# Variable de entorno para el puerto
ENV PORT 3000

# El comando para iniciar el servidor de Next.js en modo producción
# El entrypoint es server.js dentro de la carpeta .next/standalone
CMD ["node", "server.js"]
