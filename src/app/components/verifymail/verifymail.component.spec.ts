import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifymailComponent } from './verifymail.component';

describe('VerifymailComponent', () => {
  let component: VerifymailComponent;
  let fixture: ComponentFixture<VerifymailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifymailComponent]
    });
    fixture = TestBed.createComponent(VerifymailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
