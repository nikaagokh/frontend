import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinifavoritesdesktopComponent } from './minifavoritesdesktop.component';

describe('MinifavoritesdesktopComponent', () => {
  let component: MinifavoritesdesktopComponent;
  let fixture: ComponentFixture<MinifavoritesdesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinifavoritesdesktopComponent]
    });
    fixture = TestBed.createComponent(MinifavoritesdesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
