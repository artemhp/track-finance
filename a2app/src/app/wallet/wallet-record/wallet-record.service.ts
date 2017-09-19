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

    let covertDate = function (value) {
      let [year, month, day] = value.split('-');
      return new Date(year, (+month - 1), day);
    }

    const now = covertDate(data.date)
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonthTimestamp = +thisMonth;
    const thisDayTimestamp = +thisDay;

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

    return Observable.fromPromise(walletRef.push(data))
      .flatMap(w => {
        return walletRecordStatsRef.take(1).flatMap(el => {
          return walletRecordStatsRef.set({
            'total': (el.total || 0) + 1,
            'balance': (el.balance || 0) + setBalance(data.amount, data.type),
            'date': setTimeStamp(data.timestamp, el.timestamp)
          })
        }).map(el => w);
      })
      .flatMap(el => {

        let observeDaily;
        let observeMonthly

        if (data.type == 'income') {

          let incomeDailyRef = this.walletInfoService.walletRecordStatisticIncomeDailyRef(wid, thisDayTimestamp);
          let incomeMonthlyRef = this.walletInfoService.walletRecordStatisticIncomeMonthlyRef(wid, thisMonthTimestamp);

          observeDaily = incomeDailyRef.take(1).flatMap(el => incomeDailyRef.set((el.$value || 0) + data.amount));
          observeMonthly = incomeMonthlyRef.take(1).flatMap(el => incomeMonthlyRef.set((el.$value || 0) + data.amount));

        } else {

          let spendingDailyRef = this.walletInfoService.walletRecordStatisticIncomeDailyRef(wid, thisDayTimestamp);
          let spendingMonthlyRef = this.walletInfoService.walletRecordStatisticIncomeMonthlyRef(wid, thisMonthTimestamp);

          observeDaily = spendingDailyRef.take(1).flatMap(el => spendingDailyRef.set((el.$value || 0) + data.amount));
          observeMonthly = spendingMonthlyRef.take(1).flatMap(el => spendingMonthlyRef.set((el.$value || 0) + data.amount));

        }

        return Observable.merge(observeDaily, observeMonthly);

      })
      .flatMap(el => {

        let cid = data.categoryId;
        let observeDaily;
        let observeMonthly

        if (data.type == 'income') {

          let incomeDailyRef = this.walletInfoService.categoryStatisticIncomeDailyRef(wid, cid, thisDayTimestamp);
          let incomeMonthlyRef = this.walletInfoService.categoryStatisticIncomeMonthlyRef(wid, cid, thisMonthTimestamp);

          observeDaily = incomeDailyRef.take(1).flatMap(el => incomeDailyRef.set((el.$value || 0) + data.amount));
          observeMonthly = incomeMonthlyRef.take(1).flatMap(el => incomeMonthlyRef.set((el.$value || 0) + data.amount));

        } else {

          let spendingDailyRef = this.walletInfoService.categoryStatisticIncomeDailyRef(wid, cid, thisDayTimestamp);
          let spendingMonthlyRef = this.walletInfoService.categoryStatisticIncomeMonthlyRef(wid, cid, thisMonthTimestamp);

          observeDaily = spendingDailyRef.take(1).flatMap(el => spendingDailyRef.set((el.$value || 0) + data.amount));
          observeMonthly = spendingMonthlyRef.take(1).flatMap(el => spendingMonthlyRef.set((el.$value || 0) + data.amount));

        }

        return Observable.merge(observeDaily, observeMonthly);

      })

  }

}
