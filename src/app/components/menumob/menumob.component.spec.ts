import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumobComponent } from './menumob.component';

describe('MenumobComponent', () => {
  let component: MenumobComponent;
  let fixture: ComponentFixture<MenumobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenumobComponent]
    });
    fixture = TestBed.createComponent(MenumobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
