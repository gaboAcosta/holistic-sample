FROM node:8

WORKDIR /app

COPY package.json yarn.lock index.js ./
RUN yarn install

ENTRYPOINT ["yarn"]
CMD ["start"]