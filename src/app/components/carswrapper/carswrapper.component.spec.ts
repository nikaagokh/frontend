import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarswrapperComponent } from './carswrapper.component';

describe('CarswrapperComponent', () => {
  let component: CarswrapperComponent;
  let fixture: ComponentFixture<CarswrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarswrapperComponent]
    });
    fixture = TestBed.createComponent(CarswrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
