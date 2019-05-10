import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPdfPage } from './test-pdf.page';

describe('TestPdfPage', () => {
  let component: TestPdfPage;
  let fixture: ComponentFixture<TestPdfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPdfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
