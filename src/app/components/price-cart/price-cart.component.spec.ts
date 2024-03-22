import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCartComponent } from './price-cart.component';

describe('PriceCartComponent', () => {
  let component: PriceCartComponent;
  let fixture: ComponentFixture<PriceCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceCartComponent]
    });
    fixture = TestBed.createComponent(PriceCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
