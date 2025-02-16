# Based on Docker Alpine
FROM node:10-alpine

# Create an app directory
RUN mkdir -p /app
WORKDIR /app

# Copy important parts of the app
COPY . /app
RUN rm -rf ./node_modules

# Installing
RUN npm install
RUN npm run build

VOLUME /data

EXPOSE 3004

CMD npm run in-docker
