import { Injectable } from '@angular/core';
import { WalletInfoService } from '../wallet-info/wallet-info.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class WalletRecordService {

  constructor(
    private walletInfoService: WalletInfoService
  ) { }

  recordWallet = (wid, data) => {
    const walletRef = this.walletInfoService.walletRecordsRef(wid);
    const walletRecordStatsRef = this.walletInfoService.walletRecordStatsRef(wid);

    function setBalance(amount, type) {
      if (type == 'income') {
        return Math.abs(amount);
      } else {
        return Math.abs(amount) * -1.;
      }
    }

    function setTimeStamp(current, last) {
      if (!last) return current;
      if (current > last) { return current; }
      else { return last; }
    }

    return Observable.fromPromise(
      walletRef.push(data)).flatMap(w =>
        walletRecordStatsRef.take(1).flatMap(el =>
          walletRecordStatsRef.set({
            'total': (el.total || 0) + 1,
            'balance': (el.balance || 0) + setBalance(data.amount, data.type),
            'date': setTimeStamp(data.timestamp, el.timestamp)
          })
        )
      );

  }

}
