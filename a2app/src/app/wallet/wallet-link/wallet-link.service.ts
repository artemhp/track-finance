import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class WalletLinkService {

  constructor(
    private afDB: AngularFireDatabase
  ) { }

  addUser = function (wallet, uid, displayName) {
    return this.afDB.object('/wallets/' + wallet + '/users').set({
      [uid]: displayName
    });
  };



}
