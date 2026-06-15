FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="postgresql://moneyfy_user:moneyfy_password@postgres:5432/moneyfy_db?schema=public"

RUN npx prisma generate

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]