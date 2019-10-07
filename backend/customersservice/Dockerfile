FROM node:latest

COPY . /src

WORKDIR /src

# install all npm dependencies
RUN npm install

# expose port 8082
EXPOSE 8082
# start the app
CMD node app.js

