import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShareWalletFormService } from "../settings/share-wallet-form.service";
import { StatusService } from "../core/status.service";
declare var $: any;

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  private shareWalletForm;
  private walletList;

  constructor(
    private shareWalletFormService: ShareWalletFormService,
    private afDB: AngularFireDatabase,
    private status: StatusService
  ) { }

  private onSubmit = function ({ value, valid }) {
    if (valid) {
      debugger;
    }
  }

  ngOnInit() {
    this.shareWalletForm = this.shareWalletFormService.getShareWalletForm();

    let walletObserv = this.afDB.list('/users/' + this.status['uid'] + '/wallets');

    walletObserv.subscribe(
      (el) => {
        this.walletList = el;
        this.shareWalletFormService.changeShareWalletForm('wallet', this.walletList[0]['title'])
        setTimeout(() => $('.ui.dropdown').dropdown(), 0)
      });

  }

}
