FROM node:14.18
WORKDIR /var/www
COPY package*.json ./
RUN npm install --force
COPY . .
EXPOSE 3000
CMD npm run start
