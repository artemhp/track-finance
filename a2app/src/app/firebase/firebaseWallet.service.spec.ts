import { TestBed, inject } from '@angular/core/testing';

import { FirebaseWalletService } from './firebaseWallet.service';

describe('FirebaseWalletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseWalletService]
    });
  });

  it('should ...', inject([FirebaseWalletService], (service: FirebaseWalletService) => {
    expect(service).toBeTruthy();
  }));
});
