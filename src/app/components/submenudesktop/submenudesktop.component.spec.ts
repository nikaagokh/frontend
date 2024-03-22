import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenudesktopComponent } from './submenudesktop.component';

describe('SubmenudesktopComponent', () => {
  let component: SubmenudesktopComponent;
  let fixture: ComponentFixture<SubmenudesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmenudesktopComponent]
    });
    fixture = TestBed.createComponent(SubmenudesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
