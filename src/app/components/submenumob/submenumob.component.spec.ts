import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenumobComponent } from './submenumob.component';

describe('SubmenumobComponent', () => {
  let component: SubmenumobComponent;
  let fixture: ComponentFixture<SubmenumobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmenumobComponent]
    });
    fixture = TestBed.createComponent(SubmenumobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
