
FROM nginx:1.13.3

MAINTAINER Gabo Acosta <gabo@gaboacosta.com>

RUN apt-get update
RUN apt-get install -y curl gnupg2
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

RUN npm install -g yarn

WORKDIR /app
COPY . ./
RUN yarn install
RUN yarn build
RUN cp -r build/bundle.js /usr/share/nginx/html

