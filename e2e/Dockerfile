#
# Nightwatch.js Dockerfile
#

FROM node:8-alpine

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

ENTRYPOINT ["yarn"]
