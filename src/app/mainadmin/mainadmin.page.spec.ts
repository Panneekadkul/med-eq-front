import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainadminPage } from './mainadmin.page';

describe('MainadminPage', () => {
  let component: MainadminPage;
  let fixture: ComponentFixture<MainadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainadminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
