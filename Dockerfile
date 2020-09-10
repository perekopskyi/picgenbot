FROM node:12.18.3-alpine3.9
LABEL maintainer="yevheniiperekopskyi@gmail.com"
WORKDIR /app

COPY . /app
RUN apk add --update --no-cache \
  make \
  g++ \
  jpeg-dev \
  cairo-dev \
  giflib-dev \
  pango-dev

RUN npm install

CMD ["node", "bot.js"]