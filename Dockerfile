FROM node:14.10.0-stretch-slim
LABEL maintainer="yevheniiperekopskyi@gmail.com"

WORKDIR /app

COPY . /app

RUN npm install

CMD ["node", "bot.js"]