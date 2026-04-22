# Usa una imagen ligera de Nginx para servir contenido estático
FROM nginx:alpine

# Copia los archivos del proyecto al directorio predeterminado de Nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80 para el tráfico web
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
