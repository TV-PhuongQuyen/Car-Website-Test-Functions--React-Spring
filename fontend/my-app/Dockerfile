FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# Cài dependencies
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
