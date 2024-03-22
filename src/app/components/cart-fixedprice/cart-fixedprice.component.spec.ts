import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFixedpriceComponent } from './cart-fixedprice.component';

describe('CartFixedpriceComponent', () => {
  let component: CartFixedpriceComponent;
  let fixture: ComponentFixture<CartFixedpriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartFixedpriceComponent]
    });
    fixture = TestBed.createComponent(CartFixedpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
