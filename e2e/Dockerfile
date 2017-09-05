#
# Nightwatch.js Dockerfile
#

FROM node:8-alpine

MAINTAINER Sebastian Tschan <mail@blueimp.net>

RUN apk --no-cache add \
    # Install tini, a tiny but valid init for containers:
    tini \
    # Install ffmpeg for video recording:
    ffmpeg \
  # Clean up obsolete files:
  && rm -rf \
    /tmp/* \
    /root/.npm

RUN npm install -g yarn

WORKDIR /e2e
COPY package.json ./
RUN yarn install

ENTRYPOINT ["yarn"]
