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
      let arraydata = [];
      var filteredData = [];

      for (let key in data){
        arraydata.push(data[key])
      }
      for (let book of arraydata){
        if(!book.status){
          filteredData.push(book);
        }
      }
      this.books = filteredData;
    });
  }
  makeOrder(){
    let data = {
      "bookName": this.selectedBook,
      "ClientName": this.selectedCustomer
    }
    this.ordersService.makeOrder(data)
    .subscribe((data) => {
      location.reload();
    });
  }
}
