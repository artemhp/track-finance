import { TestBed, inject } from '@angular/core/testing';

import { WalletRecordService } from './wallet-record.service';

describe('WalletRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletRecordService]
    });
  });

  it('should be created', inject([WalletRecordService], (service: WalletRecordService) => {
    expect(service).toBeTruthy();
  }));
});
