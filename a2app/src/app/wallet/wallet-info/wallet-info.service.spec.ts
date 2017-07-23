import { TestBed, inject } from '@angular/core/testing';

import { WalletInfoService } from './wallet-info.service';

describe('WalletInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletInfoService]
    });
  });

  it('should ...', inject([WalletInfoService], (service: WalletInfoService) => {
    expect(service).toBeTruthy();
  }));
});
