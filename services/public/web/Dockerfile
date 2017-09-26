FROM nginx:1.13.3

MAINTAINER Gabo Acosta <gabo@gaboacosta.com>
RUN apt update && apt install -y \
	build-essential\
	curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt install -y nodejs

RUN node -v

RUN npm install -g yarn

WORKDIR /app

COPY  . ./
RUN yarn install
RUN yarn build

RUN rm /usr/share/nginx/html/index.html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN cp /app/public/index.html /usr/share/nginx/html
RUN cp /app/build/bundle.js /usr/share/nginx/html

