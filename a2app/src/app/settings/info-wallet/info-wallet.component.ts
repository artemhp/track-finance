import { Component, OnInit, Input } from '@angular/core';
import { WalletInfoService } from '../../wallet/wallet-info/wallet-info.service';
import { StatusService } from "../../core/status.service";

@Component({
  selector: 'app-info-wallet',
  templateUrl: './info-wallet.component.html',
  styleUrls: ['./info-wallet.component.css']
})
export class InfoWalletComponent implements OnInit {
  @Input() wallet;
  constructor(
    private walletInfoService: WalletInfoService,
    private status: StatusService,
  ) { }

  info = {};

  ngOnInit() {
    let wid = this.wallet['$key'];

    this.walletInfoService.walletRecordStatsRef(wid).subscribe(el => {      
      this.info['date'] = el['date'];
      this.info['balance'] = el['balance'];
      this.info['total'] = el['total'];
    });

    this.walletInfoService.walletRecordUsersRef(wid).subscribe(el => {      
      let users = el.map(el => el.$value).filter(el => el !== this.status['name']);
      this.info['users'] = users.join(", ");
    });

    this.walletInfoService.userWalletByIdRef(this.status['uid'], wid).subscribe(el => {
      this.info['title'] = el['title'];
    });
  }

}
