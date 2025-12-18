FROM node:20-alpine

EXPOSE 6006

WORKDIR /app

COPY package.json ./

# Cambio yarn por npm
RUN npm install

COPY . .

CMD [ "npm", "run", "storybook" ]