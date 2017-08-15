import { Injectable } from '@angular/core';
import { WalletInfoService } from '../wallet/wallet-info/wallet-info.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class UserCreateService {

  constructor(
    private walletInfoService: WalletInfoService
  ) { }

  userCreate = (val) => {
    const userRef = this.walletInfoService.userRef(val.uid);
    return Observable.fromPromise(userRef.update({
      email: val.email,
      name: val.displayName      
    }));
  }

}
