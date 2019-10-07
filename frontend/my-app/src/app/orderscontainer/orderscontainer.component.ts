import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { BooksServiceService } from '../services/books-service.service';

@Component({
  selector: 'app-orderscontainer',
  templateUrl: './orderscontainer.component.html',
  styleUrls: ['./orderscontainer.component.scss']
})
export class OrderscontainerComponent implements OnInit {
  public customers;
  public books;
  constructor(private customersService: CustomersService, private booksService: BooksServiceService) { }

  ngOnInit() {
  this.getCustomers();
  this.getBooks();
  }
  getCustomers() {
    this.customersService.getCustomers()
    .subscribe((data) => {
      this.customers = data;
    });
  }
  getBooks() {
    this.booksService.getBooks()
    .subscribe((data) => {
      console.log('data-----------------', data);

      this.books = data;
      console.log('data', data);
    });
  }
  makeOrder(){

  }
}
