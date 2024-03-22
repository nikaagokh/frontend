import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorymobComponent } from './categorymob.component';

describe('CategorymobComponent', () => {
  let component: CategorymobComponent;
  let fixture: ComponentFixture<CategorymobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorymobComponent]
    });
    fixture = TestBed.createComponent(CategorymobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
