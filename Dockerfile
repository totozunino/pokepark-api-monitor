FROM node:24-alpine

WORKDIR /app

# Se copian primero para aprovechar el cache de Docker
COPY package.json package-lock.json ./

# Instalación reproducible de dependencias
RUN npm ci

COPY . .

# Cambiá el puerto según tu aplicación
EXPOSE 3000

CMD ["npm", "start"]
