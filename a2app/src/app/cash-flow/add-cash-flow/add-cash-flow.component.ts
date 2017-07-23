import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { CashFlow } from "../cash-flow.interface";
import { StatusService } from "../../core/status.service";
import { Observable } from "rxjs";
import * as firebase from 'firebase';
import { CashFlowFormService } from "../cash-flow-form.service";
declare var $: any;

@Component({
  selector: 'app-add-cash-flow',
  templateUrl: 'add-cash-flow.component.html',
  styleUrls: ['add-cash-flow.component.css']
})

export class AddCashFlowComponent
  implements OnInit {

  private cashFlowForm;
  private dateFormatter;
  private wallet;

  private onSubmit = function ({ value, valid }) {
    if (valid) {
      let [year, month, day] = value.date.split('-');
      value.timestamp = + new Date(year, (+month - 1), day);

      let wid = this.cashFlowForm.get('walletId').value;

      const userWalletRef = this.af.database.list('/records/' + wid + '/wallets');

      userWalletRef.take(1);

      this.af.database.list('/records' + '/' + this.cashFlowForm.get('walletId').value).push(value)
        .then(_ => console.log('success'))
        .catch(err => console.log(err, 'You dont have access!'));
    }
  }

  constructor(
    private afDB: AngularFireDatabase,
    private status: StatusService,
    private cashFlowFormService: CashFlowFormService
  ) { }

  public currentWallet = {
    'title': '',
    'id': ''
  };

  public diagnostic() { return JSON.stringify(this.wallet); }

  ngOnInit() {

    let walletObserv = this.afDB.list('/users/' + this.status['uid'] + '/wallets');

    walletObserv.subscribe(
      (el) => {
        this.wallet = el;
        this.currentWallet.title = this.wallet[0]['title'];
        this.currentWallet.id = this.wallet[0]['$key'];
        this.cashFlowFormService.changeCashFlowForm('wallet', this.wallet[0]['title'])

        setTimeout(() => $('.ui.dropdown').dropdown(), 0)
      });

    this.cashFlowForm = this.cashFlowFormService.getCashFlowForm();
    this.cashFlowForm.get('wallet').valueChanges.subscribe(data => {
      this.cashFlowFormService.changeCashFlowForm('walletId', this.wallet[0]['$key']);
    });
  }
}