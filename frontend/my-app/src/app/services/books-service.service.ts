import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  constructor(private http: HttpClient) { }

  getBooks() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    return this.http.get('http://localhost:8081/getBooks', httpOptions);
  }
}
