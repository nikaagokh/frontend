import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutsubmitComponent } from './logoutsubmit.component';

describe('LogoutsubmitComponent', () => {
  let component: LogoutsubmitComponent;
  let fixture: ComponentFixture<LogoutsubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutsubmitComponent]
    });
    fixture = TestBed.createComponent(LogoutsubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
