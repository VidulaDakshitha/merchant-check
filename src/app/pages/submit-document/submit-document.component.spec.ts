import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDocumentComponent } from './submit-document.component';

describe('SubmitDocumentComponent', () => {
  let component: SubmitDocumentComponent;
  let fixture: ComponentFixture<SubmitDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
