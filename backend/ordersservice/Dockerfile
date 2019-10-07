FROM node:latest

COPY . /src

WORKDIR /src

# install all npm dependencies
RUN npm install

# expose port 8083
EXPOSE 8083
# start the app
CMD node app.js

