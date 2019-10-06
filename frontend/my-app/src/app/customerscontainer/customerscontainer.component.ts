import { Component, OnInit } from '@angular/core';

import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-customerscontainer',
  templateUrl: './customerscontainer.component.html',
  styleUrls: ['./customerscontainer.component.scss']
})
export class CustomerscontainerComponent implements OnInit {
  public customers;
  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.showCustomers();
  }

  addUserInfo(firstName, lastName, phoneNumber) {
    const customer = {
      firstName: String(firstName),
      lastName: String(lastName),
      phoneNumber: String(phoneNumber)
    };
    // tslint:disable-next-line: max-line-length
    this.customersService.addCustomer(customer).subscribe(() => {}, (error) => console.log(error), () => console.log('Data Insert'));
  }

  showCustomers() {
    this.customersService.getCustomers()
    .subscribe((data) => {
      this.customers = data;
      // console.log('data', data);
      // console.log('this.books', this.books);
    });
  }
}

