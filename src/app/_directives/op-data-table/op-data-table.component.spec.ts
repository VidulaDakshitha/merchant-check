import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpDataTableComponent } from './op-data-table.component';

describe('OpDataTableComponent', () => {
  let component: OpDataTableComponent;
  let fixture: ComponentFixture<OpDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
