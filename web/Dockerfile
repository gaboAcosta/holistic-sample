
FROM node:8 as builder

MAINTAINER Gabo Acosta <gabo@gaboacosta.com>

WORKDIR /app

COPY  . ./
RUN yarn install
RUN yarn build

FROM nginx:1.13.3 as sever

MAINTAINER Gabo Acosta <gabo@gaboacosta.com>

RUN rm /usr/share/nginx/html/index.html
COPY --from=builder /app/public/index.html /usr/share/nginx/html
COPY --from=builder /app/build/bundle.js /usr/share/nginx/html

