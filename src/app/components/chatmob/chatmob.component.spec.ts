import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatmobComponent } from './chatmob.component';

describe('ChatmobComponent', () => {
  let component: ChatmobComponent;
  let fixture: ComponentFixture<ChatmobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatmobComponent]
    });
    fixture = TestBed.createComponent(ChatmobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
