# use latest official node container
FROM node:latest

COPY . /src

WORKDIR /src

# install all npm dependencies
RUN npm install

# expose port 8081
EXPOSE 8081
# start the app
CMD node app.js

