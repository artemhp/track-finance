import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShareWalletFormService } from "./share-wallet-form.service";
import { StatusService } from "../../core/status.service";
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-share-wallet',
  templateUrl: './share-wallet.component.html',
  styleUrls: ['./share-wallet.component.css']
})
export class ShareWalletComponent implements OnInit {

  private shareWalletForm;

  private walletList;

  private shareWallet = function ({ value, valid }) {

    if (valid) {

      const items = this.afDB.list('/inbox/' + value['email'].replace(".", "~"));
      console.log(this.status);
      debugger;
      items.push({
        'message': 'You have been invited to use shared wallet with ' + this.status['name'],
        'wid': value.wallet,
        'status': 'pending',
        'wallet': value.wallet,
        'author': this.status['name']
      });

      this.shareWalletForm.controls['email'].patchValue('');

    }

  }

  constructor(
    private shareWalletFormService: ShareWalletFormService,
    private afDB: AngularFireDatabase,
    private status: StatusService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.shareWalletForm = this.shareWalletFormService.getShareWalletForm();
    this.route.params.subscribe(params => {
      this.shareWalletForm.controls['wallet'].patchValue(params['id']);
    });
  }

}
