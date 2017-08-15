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
  acceptWallet = function (wallet, inboxId) {    
    this.walletInfoService.userWalletByIdRef(this.status['uid'], wallet).set({title: 'Wallet' + Math.floor((Math.random() * 10) + 1)});
    this.afDB.object('/users/' + this.status['uid'] + '/inbox/'+inboxId).update({ status: 'done' });
    this.afDB.object('/wallets/' + wallet + '/users').update({
      [this.status['uid']]: this.status['name']
    })

  }

  ngOnInit() {
    const items = this.afDB.list('/users/' + this.status['uid'] + '/inbox', {
      query: { 
        orderByChild: 'status', 
        equalTo: 'pending' 
      }
    });
    items.subscribe(el => this.notifications = el);
  }

}
