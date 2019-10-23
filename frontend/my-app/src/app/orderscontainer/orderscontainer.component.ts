import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { BooksServiceService } from '../services/books-service.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orderscontainer',
  templateUrl: './orderscontainer.component.html',
  styleUrls: ['./orderscontainer.component.scss']
})
export class OrderscontainerComponent implements OnInit {
  public customers;
  public books;
  selectedBook: string;
  selectedCustomer: string;
  constructor(private customersService: CustomersService, private booksService: BooksServiceService, private ordersService: OrdersService) { }

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
    let data = {
      "bookName": this.selectedBook,
      "ClientName": this.selectedCustomer
    }
    // let data = {
    //   "bookName": "book1",
    //   "ClientName": "Gayel"
    // }
    console.log(data);
    this.ordersService.makeOrder(data)
    .subscribe((data) => {
      console.log(data);
      location.reload();
    });
  }
}
