# ProjetIntegrationDesApplications

this is our project


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

In order to stop a container, write the following command:

> ``` docker stop <Container_Name> ```