FROM node:latest

COPY . /src

WORKDIR /src

# install all npm dependencies
RUN npm install

# expose port 8080
EXPOSE 8080
# start the app
CMD node app.js

