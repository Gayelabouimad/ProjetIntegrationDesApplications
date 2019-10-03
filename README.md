# ProjetIntegrationDesApplications

## Backend

to build one of the microservices. example :
go to backend/booksservice and run

> ``` npm install ```

then run

> ``` node app.js ```


**If you want to use a live reloading engine** run the following command:

> ``` npm i -g nodemon ```

and then instead of running `node app.js` , use `nodemon app.js`

this tool will re-run the backend every time a change is made

## Frontend

to build the front end go to /frontend/my-app and run

> ``` npm install ```

then run

> ``` ng serve ```

then in your browser

> ``` localhost:4200 ```

## MongoDB commands (To Run MongoDB)
Open the shell and write down this command

> ```mongod --dbpath "C://YOURDIRECTORY//ProjetIntegrationDesApplications//database"```

Then in another shell

> ```mongo.exe```


## MongoDB commands (To create a DB)
In order to create a Database

> ``` use <DB_Name> ```

In order to create a collection

> ``` db.createCollection("<Coll_Name>")```

In order to add a row to the collection

> ``` db.<Coll_Name>.insert({<all the key-value pairs>})```

In order to get all the collection

> ``` db.<Coll_Name>.find()```



## Fetching data in the front-end commands
In order to fetch data, you need to create a service. To do that :
open the terminal in the services folder then write this command

> ``` ng generate service <service_Name> ```
example "ng generate service booksService"

In this service you will need to do an Http request so you need to import the Http module in the app module

> ```import { HttpClientModule } from '@angular/common/http';```

and place HttpClientModule under the imports array in NgModules

Now after importing it in the app module, you need to configure the service
you should import the http client in the service as follows:

> ``` import { HttpClient } from '@angular/common/http'; ```

then add it to the constructor in order to use it in the functions to make the call

> ```   constructor(private http: HttpClient) { } ```

To make the call to the back end, create the function getSomething() as follows

> ```
>  getBooks() {
>    const httpOptions = {
>      headers: new HttpHeaders({
>        'Content-Type':  'application/json',
>        Authorization: 'my-auth-token'
>      })
>    };
>    return this.http.get('http://localhost:8081/getBooks', httpOptions);
>  }
>  ```

this function will be used in the books container component as follows

```
  constructor(private booksService: BooksServiceService) { }

  ngOnInit() {
    this.showConfig();
  }

  showConfig() {
    this.booksService.getBooks()
    .subscribe((data) => {
      this.books = data;
      console.log('data', data);
      console.log('this.books', this.books);
    });
  }
```
In order to use this service we should inport it in the component

> ``` import { BooksServiceService } from '../services/books-service.service'; ```

After fetching the data in the component ts file. we should show it in the html.
since the data in ts is binded to the data in the ts we can simply use the books object that's in the ts by using {{ books }} in the html file as follows

```
    <div *ngFor="let book of books">
      {{book.name}}
    </div>
```

as the code above shows we are looping over the array(books) of objects(book) using *ngFor
then for each book we are displaying its name



## Docker and Co..

### Definition

**What is Docker?**

- Enterprise-ready container platform
- Provides security and governance
- Automation by design
- Support and certification

Docker takes advantage of a concept called containerization.

- It solves the problem of how to reliably move software between environments
- Encapsulates the entire runtime environment
- Includes the application and its dependencies, libraries and other binaries

Docker and Virtual box cannot be installed on the same machine and work simultaniously because of Hyper-V.
So in order to use docker we install **docker tool box** from [](https://github.com/docker/toolbox/releases)
after installing it, click on **docker quickstart terminal**. When its done, we can now use docker

As an example we can test the following command

> ``` docker run hello-world  ```

or

> ``` docker run -it ubuntu bash ```

In order to see all the docker processes that are running, open another command line and write the following command:

> ``` docker ps ```

In order to see all the docker images, write the following command:

> ``` docker images ```

In order to stop a container, write the following command from another cmd:

> ``` docker stop <Container_Name> ```

or
> ``` exit ```

To create a container

> ``` docker run --name <container_Name> -it <image_name> ```

To remove a container

> ``` docker rm <container_name or container_ID>```


## NGINX
This tool will help us make load balance and acts as an API Gateway.

there are three methods of Scalability
- Run multiple copies behind a load balancer
- Split the app into multiple services
- partition the data using data shards

The goal is to split traffic among multiple servers
most common scaling solution
can be deployed as single or multiple services per server

**What is NGINX?**
- web server
- load balancer
- Reverse/ Forward Proxy
- Cache manager

how to install it on ubuntu :
first we should create the container

> ``` docker run --name NGINX_APIGATEWAY -it ubuntu ```

once the image is created the shell is an ubuntu shell. write the following commands

1. ``` apt-get update ``` to update the packages
2. ``` apt-get install nginx ``` to install nginx
in order to run it we need to type nginx on a specific port so

3. ``` exit ```

4. ``` docker commit <image_ID> <choose a repo name> ```
example : docker commit 1f0c95423750 nginx_micro

5. ``` docker run -it -p 8083:80 nginx_micro ```

now we are running an ubuntu image in our container

6. ``` service nginx start ```

now open chrome and type :

``` http://192.168.99.100:8083/ ```

(we used 192.168.99.100 instead of localhost because we are using docker toolbox)

we are redirected to welcome to nginx




## PM2