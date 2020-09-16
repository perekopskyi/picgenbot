FROM node:14.10.0-stretch-slim
LABEL maintainer="yevheniiperekopskyi@gmail.com"

WORKDIR /app

COPY . /app

RUN apt-get update
RUN apt-get install -y libpango-1.0-0
RUN npm install

CMD ["node", "bot.js"]