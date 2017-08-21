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

  walletRecordStatisticIncomeDailyRef = (wid, day) => this.afDB.object('/wallets/' + wid + '/statistic/daily/income/' + day);
  walletRecordStatisticSpendingDailyRef = (wid, day) => this.afDB.object('/wallets/' + wid + '/statistic/daily/spending/' + day);

  walletRecordStatisticIncomeMonthlyRef = (wid, month) => this.afDB.object('/wallets/' + wid + '/statistic/monthly/income/' + month);
  walletRecordStatisticSpendingMonthlyRef = (wid, month) => this.afDB.object('/wallets/' + wid + '/statistic/monthly/spending/' + month);

  walletRecordUsersRef = (w) => this.afDB.list('/wallets/' + w + '/users');
  userRef = (uid) => this.afDB.object('/users/' + uid);

  categoryStatsRef = (wid, cid) => this.afDB.object('/wallets/' + wid + '/category/' + cid + '/stats');

  categoryStatisticIncomeDailyRef = (wid, cid, day) => this.afDB.object('/wallets/' + wid + '/category/' + cid + '/statistic/daily/income' + day);
  categoryStatisticSpendingDailyRef = (wid, cid, day) => this.afDB.object('/wallets/' + wid + '/category/' + cid + '/statistic/daily/spending' + day);

  categoryStatisticIncomeMonthlyRef = (wid, cid, month) => this.afDB.object('/wallets/' + wid + '/category/' + cid + '/statistic/monthly/income' + month);
  categoryStatisticSpendingMonthlyRef = (wid, cid, month) => this.afDB.object('/wallets/' + wid + '/category/' + cid + '/statistic/monthly/spending' + month);

}