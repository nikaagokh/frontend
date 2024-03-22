import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedpriceComponent } from './fixedprice.component';

describe('FixedpriceComponent', () => {
  let component: FixedpriceComponent;
  let fixture: ComponentFixture<FixedpriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixedpriceComponent]
    });
    fixture = TestBed.createComponent(FixedpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
