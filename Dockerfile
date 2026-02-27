FROM node:18-alpine

WORKDIR /app

# instalar deps primeiro (cache)
COPY package*.json ./
RUN npm ci --omit=dev

# copiar o resto
COPY . .

# Railway seta PORT automaticamente; default 8080
ENV NODE_ENV=production
EXPOSE 8080

CMD ["npm", "start"]