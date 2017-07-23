import { TestBed, inject } from '@angular/core/testing';

import { ShareWalletFormService } from './share-wallet-form.service';

describe('ShareWalletFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareWalletFormService]
    });
  });

  it('should be created', inject([ShareWalletFormService], (service: ShareWalletFormService) => {
    expect(service).toBeTruthy();
  }));
});
