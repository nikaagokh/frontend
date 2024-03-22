import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinicartdesktopComponent } from './minicartdesktop.component';

describe('MinicartdesktopComponent', () => {
  let component: MinicartdesktopComponent;
  let fixture: ComponentFixture<MinicartdesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinicartdesktopComponent]
    });
    fixture = TestBed.createComponent(MinicartdesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
