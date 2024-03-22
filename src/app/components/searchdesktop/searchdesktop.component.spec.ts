import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdesktopComponent } from './searchdesktop.component';

describe('SearchdesktopComponent', () => {
  let component: SearchdesktopComponent;
  let fixture: ComponentFixture<SearchdesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchdesktopComponent]
    });
    fixture = TestBed.createComponent(SearchdesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
