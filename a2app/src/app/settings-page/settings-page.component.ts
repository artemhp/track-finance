import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusService } from "../core/status.service";
import { WalletInfoService } from '../wallet/wallet-info/wallet-info.service';

declare var $: any;

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  private wallets = [];

  constructor(
    private afDB: AngularFireDatabase,
    private status: StatusService,
    private walletInfoService: WalletInfoService
  ) { }

  ngOnInit() {
    this.walletInfoService.walletInUserRef(this.status['uid']).subscribe(w => {
      this.wallets = w;
    });
  }

}