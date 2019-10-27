FROM node:latest

COPY /my-app /src

WORKDIR /src

# install all npm dependencies
RUN npm install
RUN npm install -g @angular/cli #added

# expose port 4200
EXPOSE 4200
# start the app
# ENTRYPOINT ["npm", "start", "--host", "0.0.0.0"]
# CMD npm start --host 0.0.0.0
CMD ng serve --host 0.0.0.0 #added
