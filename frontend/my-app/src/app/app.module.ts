import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BookscontainerComponent } from './bookscontainer/bookscontainer.component';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import { FormsModule } from '@angular/forms';


import { CustomerscontainerComponent } from './customerscontainer/customerscontainer.component';
import { OrderscontainerComponent } from './orderscontainer/orderscontainer.component';

// for HTTP calls (to the backend)
import { HttpClientModule } from '@angular/common/http';

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
    MatCardModule,
    HttpClientModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
