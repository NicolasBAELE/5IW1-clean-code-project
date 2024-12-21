FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./src ./src

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]