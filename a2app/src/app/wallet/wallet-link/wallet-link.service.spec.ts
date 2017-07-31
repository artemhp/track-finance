import { TestBed, inject } from '@angular/core/testing';

import { WalletLinkService } from './wallet-link.service';

describe('WalletLinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletLinkService]
    });
  });

  it('should be created', inject([WalletLinkService], (service: WalletLinkService) => {
    expect(service).toBeTruthy();
  }));
});
