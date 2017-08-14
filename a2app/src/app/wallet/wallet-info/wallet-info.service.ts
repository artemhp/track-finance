import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WalletInfoService {

  constructor(
    private afDB: AngularFireDatabase
  ) { }

  userWalletRef = (uid) => this.afDB.list('/users/' + uid + '/wallets');
  userWalletByIdRef = (uid, wid) => this.afDB.object('/users/' + uid + '/wallets/' + wid);
  walletRef = (w) => this.afDB.object('/wallets/' + w);
  walletRecordsRef = (w) => this.afDB.list('/records' + '/' + w);
  walletRecordStatsRef = (w) => this.afDB.object('/wallets/' + w + '/stats');
  walletRecordUsersRef = (w) => this.afDB.list('/wallets/' + w + '/users');
  userRef = (uid) => this.afDB.object('/users/' + uid);

}