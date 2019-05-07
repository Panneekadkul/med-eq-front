import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertPage } from './revert.page';

describe('RevertPage', () => {
  let component: RevertPage;
  let fixture: ComponentFixture<RevertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
