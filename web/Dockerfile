FROM node:8

WORKDIR /app

COPY package.json yarn.lock index.html .babelrc ./
RUN yarn install

# we leave this alone so if we change something it's on it's own layer
# and we don't have to do another yarn install
COPY webpack.config.js ./

EXPOSE 8080

ENTRYPOINT ["yarn"]
CMD ["start"]