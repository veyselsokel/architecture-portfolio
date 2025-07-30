# Dockerfile (Son Hali)

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
RUN npm run build


# ------------ AŞAMA 2: Yayın Aşaması ------------
FROM nginx:stable-alpine

# Build aşamasında oluşturulan /app/dist klasörünün içeriğini
# Nginx'in web sunucu klasörüne kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# Kendi hazırladığımız nginx.conf dosyasını, Nginx'in ayar klasörüne kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# YENİ EKLENEN SATIR:
# Kopyalanan tüm dosyaların web sunucusu tarafından okunabilmesi için izinleri ayarla.
RUN chmod -R a+r /usr/share/nginx/html

# Konteynerin 80 portunu dinleyeceğini belirt
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]