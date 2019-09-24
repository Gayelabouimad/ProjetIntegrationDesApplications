import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerscontainerComponent } from './customerscontainer.component';

describe('CustomerscontainerComponent', () => {
  let component: CustomerscontainerComponent;
  let fixture: ComponentFixture<CustomerscontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerscontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerscontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
