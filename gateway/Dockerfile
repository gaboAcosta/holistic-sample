FROM node:8

WORKDIR /app

COPY package.json yarn.lock index.js ./
RUN yarn install

EXPOSE 4000

ENTRYPOINT ["yarn"]
CMD ["start"]