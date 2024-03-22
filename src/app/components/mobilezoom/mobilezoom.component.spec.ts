import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilezoomComponent } from './mobilezoom.component';

describe('MobilezoomComponent', () => {
  let component: MobilezoomComponent;
  let fixture: ComponentFixture<MobilezoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobilezoomComponent]
    });
    fixture = TestBed.createComponent(MobilezoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
