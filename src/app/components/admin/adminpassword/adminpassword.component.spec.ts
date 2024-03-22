import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpasswordComponent } from './adminpassword.component';

describe('AdminpasswordComponent', () => {
  let component: AdminpasswordComponent;
  let fixture: ComponentFixture<AdminpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminpasswordComponent]
    });
    fixture = TestBed.createComponent(AdminpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
