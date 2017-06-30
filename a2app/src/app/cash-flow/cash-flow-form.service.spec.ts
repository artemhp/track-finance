import { TestBed, inject } from '@angular/core/testing';

import { CashFlowFormService } from './cash-flow-form.service';

describe('CashFlowFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashFlowFormService]
    });
  });

  it('should ...', inject([CashFlowFormService], (service: CashFlowFormService) => {
    expect(service).toBeTruthy();
  }));
});
