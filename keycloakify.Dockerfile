FROM node:20-alpine

EXPOSE 6006

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

CMD [ "npm", "run", "storybook" ]