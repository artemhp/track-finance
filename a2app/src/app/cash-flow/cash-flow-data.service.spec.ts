import { TestBed, inject } from '@angular/core/testing';

import { CashFlowDataService } from './cash-flow-data.service';

describe('CashFlowDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashFlowDataService]
    });
  });

  it('should ...', inject([CashFlowDataService], (service: CashFlowDataService) => {
    expect(service).toBeTruthy();
  }));
});
