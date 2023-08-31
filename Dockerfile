# Use uma imagem base do Node.js
FROM node:18-alpine
ENV NODE_ENV=production
ENV REACT_APP_API_URL=http://3.138.143.179:8080
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
EXPOSE 3000