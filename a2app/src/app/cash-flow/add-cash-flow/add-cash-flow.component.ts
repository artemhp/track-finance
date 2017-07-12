import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
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

  // private optionsCurrency: FirebaseListObservable<any>;
  // private optionsFlowType: FirebaseListObservable<any>;
  //private optionsCategory: FirebaseListObservable<any>;
  private wallet;



  private onSubmit = function ({ value, valid }) {
    if (valid) {
      let [year, month, day] = value.date.split('-');
      value.timestamp = + new Date(year, (+month - 1), day);
      this.af.database.list('/items').push(value)
        .then(_ => console.log('success'))
        .catch(err => console.log(err, 'You dont have access!'));
    }
  }

  constructor(
    private af: AngularFire,
    private status: StatusService,
    private cashFlowFormService: CashFlowFormService
  ) { }

  ngOnInit() {

    let walletObserv = this.af.database.list('/users/' + this.status['uid'] + '/wallets');
    walletObserv.subscribe(
      (el) => {
        this.wallet = el;
        this.cashFlowFormService.changeCashFlowForm('wallet', this.wallet[0]['title'])
        setTimeout(() => $('.ui.dropdown').dropdown(), 0)
      });

    this.cashFlowForm = this.cashFlowFormService.getCashFlowForm();
    this.cashFlowForm.get('wallet').valueChanges.subscribe(data => {
      this.cashFlowFormService.changeCashFlowForm('walletId', this.wallet[0]['$key']);
    });

    //Observable.merge(this.optionsCurrency, this.optionsFlowType).subscribe(() => setTimeout(() => $('.ui.dropdown').dropdown(), 0));
  }
}