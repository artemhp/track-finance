import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShareWalletFormService } from "./share-wallet-form.service";
import { StatusService } from "../../core/status.service";

declare var $: any;

@Component({
  selector: 'app-share-wallet',
  templateUrl: './share-wallet.component.html',
  styleUrls: ['./share-wallet.component.css']
})
export class ShareWalletComponent implements OnInit {

  private shareWalletForm;

  private walletList;

  constructor(
    private shareWalletFormService: ShareWalletFormService,
    private afDB: AngularFireDatabase,
    private status: StatusService
  ) { }

  ngOnInit() {
    this.afDB.list('/users/' + this.status['uid'] + '/wallets').subscribe(el => {
      this.walletList = el;
      setTimeout(() => $('.ui.dropdown').dropdown(), 0)
    });

    this.shareWalletForm = this.shareWalletFormService.getShareWalletForm();
  }

}
