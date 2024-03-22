import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountwrapperComponent } from './accountwrapper.component';

describe('AccountwrapperComponent', () => {
  let component: AccountwrapperComponent;
  let fixture: ComponentFixture<AccountwrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountwrapperComponent]
    });
    fixture = TestBed.createComponent(AccountwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
