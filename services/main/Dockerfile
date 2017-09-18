FROM node:8

WORKDIR /app

COPY . ./
RUN yarn install

EXPOSE 8000
EXPOSE 3000

ENTRYPOINT ["yarn"]
CMD ["start"]