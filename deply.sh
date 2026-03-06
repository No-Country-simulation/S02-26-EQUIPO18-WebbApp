#!/bin/bash

echo "Iniciando despliegue en Oracle Cloud..."

# 1. Bajar los últimos cambios de Git
echo "Sincronizando con el repositorio..."
git pull origin main

# 2. Reconstruir y levantar los contenedores
echo "Construyendo y reiniciando servicios..."
docker-compose up -d --build

# 3. Limpieza de imágenes huérfanas (para ahorrar espacio en disco)
echo "Limpiando imágenes antiguas..."
docker image prune -f

echo "¡Despliegue completado con éxito!"
echo "Tu App debería estar disponible en la IP de Oracle."