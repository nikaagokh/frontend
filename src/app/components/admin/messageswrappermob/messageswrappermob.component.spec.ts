import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageswrappermobComponent } from './messageswrappermob.component';

describe('MessageswrappermobComponent', () => {
  let component: MessageswrappermobComponent;
  let fixture: ComponentFixture<MessageswrappermobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageswrappermobComponent]
    });
    fixture = TestBed.createComponent(MessageswrappermobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
