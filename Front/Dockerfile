FROM node:20-alpine
WORKDIR /app

# Instalamos dependencias primero (aprovecha el caché de Docker)
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Argumentos de construcción (Opcional por si usas variables en el build)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build


EXPOSE 3000

# Next.js corre por defecto en 0.0.0.0 dentro de Docker
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]