import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesmobComponent } from './messagesmob.component';

describe('MessagesmobComponent', () => {
  let component: MessagesmobComponent;
  let fixture: ComponentFixture<MessagesmobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesmobComponent]
    });
    fixture = TestBed.createComponent(MessagesmobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
