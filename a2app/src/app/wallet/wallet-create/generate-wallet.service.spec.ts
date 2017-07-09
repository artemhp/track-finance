import { TestBed, inject } from '@angular/core/testing';

import { GenerateWalletService } from './generate-wallet.service';

describe('GenerateWalletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateWalletService]
    });
  });

  it('should ...', inject([GenerateWalletService], (service: GenerateWalletService) => {
    expect(service).toBeTruthy();
  }));
});
