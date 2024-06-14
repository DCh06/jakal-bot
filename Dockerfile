FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV TOKEN=x
ENV CLIENT_TOKEN=x
ENV DATABASE_URL=x

RUN npx prisma generate

CMD ["npm", "start"]