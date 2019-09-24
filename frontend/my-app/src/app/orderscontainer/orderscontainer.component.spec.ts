import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderscontainerComponent } from './orderscontainer.component';

describe('OrderscontainerComponent', () => {
  let component: OrderscontainerComponent;
  let fixture: ComponentFixture<OrderscontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderscontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderscontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
