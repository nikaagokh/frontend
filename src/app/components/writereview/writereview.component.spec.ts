import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritereviewComponent } from './writereview.component';

describe('WritereviewComponent', () => {
  let component: WritereviewComponent;
  let fixture: ComponentFixture<WritereviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WritereviewComponent]
    });
    fixture = TestBed.createComponent(WritereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
