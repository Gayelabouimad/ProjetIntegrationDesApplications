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
    this.showBooks();
  }

  showBooks() {
    this.booksService.getBooks()
    .subscribe((data) => {
      this.books = data;
    });
  }
}
