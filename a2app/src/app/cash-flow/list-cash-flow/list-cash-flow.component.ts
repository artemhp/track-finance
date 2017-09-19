import { WalletInfoService } from '../../wallet/wallet-info/wallet-info.service';
import { StatusService } from '../../core/status.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { WalletRecordService } from "../../wallet/wallet-record/wallet-record.service";
import { RecordsListComponent } from '../../records-list/records-list.component';

declare var $: any;

@Component({
  selector: 'app-list-cash-flow',
  templateUrl: './list-cash-flow.component.html',
  styleUrls: ['./list-cash-flow.component.css']
})
export class ListCashFlowComponent implements OnInit {

  constructor(
    private walletInfoService: WalletInfoService,
    private status: StatusService
  ) { }

  private walletList = [];

  ngOnInit() {

    $('.menu .item').tab();

    // this.status['uid']


    this.walletInfoService.userWalletRef(this.status['uid']).subscribe(list => {
      this.walletList = list;
      // console.log(list['$key']);
      // console.log(list['title']);

    });

    //userWalletRef

  }

}
