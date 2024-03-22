import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelldoneComponent } from './welldone.component';

describe('WelldoneComponent', () => {
  let component: WelldoneComponent;
  let fixture: ComponentFixture<WelldoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelldoneComponent]
    });
    fixture = TestBed.createComponent(WelldoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
