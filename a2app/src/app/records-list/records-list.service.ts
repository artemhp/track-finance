import { RecordsListComponent } from './records-list.component';
import { Injectable } from '@angular/core';
import { WalletInfoService } from '../wallet/wallet-info/wallet-info.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class RecordsListService {

  constructor(
    private walletInfoService: WalletInfoService
  ) {
  }

  getRecordsList = (wid) => {

    let recordsList = [];
    let categoryList = [];
    let mapCategory = {};

    const records = this.walletInfoService.walletRecordsRef(wid).flatMap(el => {
      recordsList = el;
      return this.walletInfoService.categoryList(wid);
    }).map(category => {
      category.map(el => {
        mapCategory[el['$key']] = el;
      });
      recordsList = recordsList.map(el => {
        el.category = mapCategory[el['categoryId']];
        return el;
      });
      return recordsList;
    });
    return records;
  }

  getCategoryList = (wid) => {
    const records = this.walletInfoService.categoryList(wid);
    return records;
  }

}
