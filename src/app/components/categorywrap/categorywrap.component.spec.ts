import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorywrapComponent } from './categorywrap.component';

describe('CategorywrapComponent', () => {
  let component: CategorywrapComponent;
  let fixture: ComponentFixture<CategorywrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorywrapComponent]
    });
    fixture = TestBed.createComponent(CategorywrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
