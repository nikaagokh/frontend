import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagwrapperComponent } from './tagwrapper.component';

describe('TagwrapperComponent', () => {
  let component: TagwrapperComponent;
  let fixture: ComponentFixture<TagwrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagwrapperComponent]
    });
    fixture = TestBed.createComponent(TagwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
