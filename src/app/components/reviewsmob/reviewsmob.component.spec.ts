import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsmobComponent } from './reviewsmob.component';

describe('ReviewsmobComponent', () => {
  let component: ReviewsmobComponent;
  let fixture: ComponentFixture<ReviewsmobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsmobComponent]
    });
    fixture = TestBed.createComponent(ReviewsmobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
