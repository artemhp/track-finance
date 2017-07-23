import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class WalletInfoService {

  constructor(
    private afDB: AngularFireDatabase
  ) { }

  userWalletRef = (uid) => this.afDB.list('/users/' + uid + '/wallets');
  walletRef = (w) => this.afDB.object('/wallets/' + w);

}
