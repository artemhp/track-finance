import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { StatusService } from "../core/status.service";
import { WalletInfoService } from '../wallet/wallet-info/wallet-info.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(
    private afDB: AngularFireDatabase,
    private status: StatusService,
    private walletInfoService: WalletInfoService
  ) { }

  notifications = [];
  acceptWallet = function (el) {
    console.log(el);
    this.walletInfoService.userWalletByIdRef(this.status['uid'], el)
      .set({
        title: 'Wallet' + Math.floor((Math.random() * 10) + 1)
      })
  }

  ngOnInit() {

    const items = this.afDB.list('/inbox/' + this.status['email'].replace(".", "~"));
    items.subscribe(el => {
      this.notifications = el;
    });

  }

}
