# Dockerfile

# ------------ AŞAMA 1: Build Aşaması ------------
# En güncel ve güvenli LTS sürümü olan Node.js 20'yi temel al
FROM node:20-alpine AS builder

# Konteyner içinde /app adında bir çalışma klasörü oluştur
WORKDIR /app

# Önce package.json dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Projenin geri kalan tüm kaynak kodunu kopyala
COPY . .

# Vue projesini build et
# --openssl-legacy-provider bayrağına Node 20'de genellikle gerek kalmaz
# ama uyumluluk için tutmakta sakınca yok.
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build


# ------------ AŞAMA 2: Yayın Aşaması ------------
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]