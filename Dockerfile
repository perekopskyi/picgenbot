FROM node:12.18.3-alpine3.9
LABEL maintainer="yevheniiperekopskyi@gmail.com"
WORKDIR /app

RUN apk add --update --no-cache \
  make \
  g++ \
  jpeg-dev \
  cairo-dev \
  giflib-dev \
  pango-dev \
  && npm i canvas

COPY . /app
RUN npm i

CMD ["node", "bot.js"]