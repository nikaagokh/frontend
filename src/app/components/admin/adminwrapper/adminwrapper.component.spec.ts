import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminwrapperComponent } from './adminwrapper.component';

describe('AdminwrapperComponent', () => {
  let component: AdminwrapperComponent;
  let fixture: ComponentFixture<AdminwrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminwrapperComponent]
    });
    fixture = TestBed.createComponent(AdminwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
