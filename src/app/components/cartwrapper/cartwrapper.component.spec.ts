import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartwrapperComponent } from './cartwrapper.component';

describe('CartwrapperComponent', () => {
  let component: CartwrapperComponent;
  let fixture: ComponentFixture<CartwrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartwrapperComponent]
    });
    fixture = TestBed.createComponent(CartwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
