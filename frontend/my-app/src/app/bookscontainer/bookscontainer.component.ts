import { Component, OnInit } from '@angular/core';

import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-bookscontainer',
  templateUrl: './bookscontainer.component.html',
  styleUrls: ['./bookscontainer.component.scss']
})
export class BookscontainerComponent implements OnInit {
  public books;
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
}
