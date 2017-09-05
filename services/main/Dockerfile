FROM node:8

WORKDIR /app

COPY . ./
RUN yarn install

ENTRYPOINT ["yarn"]
CMD ["start"]