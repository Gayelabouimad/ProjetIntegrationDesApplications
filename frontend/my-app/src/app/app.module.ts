import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BookscontainerComponent } from './bookscontainer/bookscontainer.component';

import {MatCardModule} from '@angular/material/card';
import { CustomerscontainerComponent } from './customerscontainer/customerscontainer.component';
import { OrderscontainerComponent } from './orderscontainer/orderscontainer.component';



@NgModule({
  declarations: [
    AppComponent,
    BookscontainerComponent,
    CustomerscontainerComponent,
    OrderscontainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }