import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenudesktopComponent } from './menudesktop.component';

describe('MenudesktopComponent', () => {
  let component: MenudesktopComponent;
  let fixture: ComponentFixture<MenudesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenudesktopComponent]
    });
    fixture = TestBed.createComponent(MenudesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
