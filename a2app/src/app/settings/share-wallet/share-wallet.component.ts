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

      const items = this.afDB.list('/users/' + value['uid'] + '/inbox');    

      items.push({
        'message': 'You have been invited to use shared wallet with ' + this.status['name'],
        'wid': value.wallet,
        'status': 'pending',        
        'author': this.status['name']
      });

      

      this.afDB.object('/wallets/'+value.wallet+'/users/'+value['uid']).set(true);          

      this.shareWalletForm.controls['uid'].patchValue('');

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
