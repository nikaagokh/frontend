import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageswrapperComponent } from './messageswrapper.component';

describe('MessageswrapperComponent', () => {
  let component: MessageswrapperComponent;
  let fixture: ComponentFixture<MessageswrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageswrapperComponent]
    });
    fixture = TestBed.createComponent(MessageswrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
