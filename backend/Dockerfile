# استخدام alpine base image عشان نقلل الحجم
FROM node:18-alpine

WORKDIR /app

# ننسخ ملفات الـ dependencies بس الأول (عشان الـ layer caching)
COPY package.json package-lock.json* ./
RUN npm install --production

# دلوقتي ننسخ باقي الكود (ده بيتغير كتير، فخليناه بعد npm install)
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
