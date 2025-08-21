FROM node:22.18

LABEL MAINTAINER="Ahmed Hamdy"

ENV NODE_ENV=development
ENV PORT=3000

COPY ./api /app

WORKDIR /app

RUN npm install --global @nestjs/cli

RUN npm install

EXPOSE $PORT

ENTRYPOINT [ "npm", "run", "start" ]
