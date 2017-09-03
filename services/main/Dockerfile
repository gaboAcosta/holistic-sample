FROM node:8

WORKDIR /app

COPY package.json yarn.lock index.js ./
RUN yarn install

EXPOSE 3000

ENTRYPOINT ["yarn"]
CMD ["start"]