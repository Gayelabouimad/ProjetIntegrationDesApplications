import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookscontainerComponent } from './bookscontainer.component';

describe('BookscontainerComponent', () => {
  let component: BookscontainerComponent;
  let fixture: ComponentFixture<BookscontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookscontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookscontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
