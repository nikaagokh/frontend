import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinifavoritesComponent } from './minifavorites.component';

describe('MinifavoritesComponent', () => {
  let component: MinifavoritesComponent;
  let fixture: ComponentFixture<MinifavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinifavoritesComponent]
    });
    fixture = TestBed.createComponent(MinifavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
