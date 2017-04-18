import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCashFlowComponent } from './list-cash-flow.component';

describe('ListCashFlowComponent', () => {
  let component: ListCashFlowComponent;
  let fixture: ComponentFixture<ListCashFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCashFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
