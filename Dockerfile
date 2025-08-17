# ---------- Stage 1: Build ----------
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Stage 2: Serve ----------
FROM nginx:alpine

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]