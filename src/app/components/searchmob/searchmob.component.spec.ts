import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmobComponent } from './searchmob.component';

describe('SearchmobComponent', () => {
  let component: SearchmobComponent;
  let fixture: ComponentFixture<SearchmobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchmobComponent]
    });
    fixture = TestBed.createComponent(SearchmobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
