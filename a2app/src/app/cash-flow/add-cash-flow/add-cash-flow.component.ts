import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CashFlow } from "../cash-flow.interface";
import { StatusService } from "../../core/status.service";
import { Observable } from "rxjs";
import * as firebase from 'firebase';
import { CashFlowFormService } from "../cash-flow-form.service";
import { WalletInfoService } from '../../wallet/wallet-info/wallet-info.service';
import { WalletRecordService } from "../../wallet/wallet-record/wallet-record.service";
declare var $: any;

@Component({
  selector: 'app-add-cash-flow',
  templateUrl: 'add-cash-flow.component.html',
  styleUrls: ['add-cash-flow.component.css']
})

export class AddCashFlowComponent
  implements OnInit {

  constructor(
    private status: StatusService,
    private cashFlowFormService: CashFlowFormService,
    private walletInfoService: WalletInfoService,
    private walletRecordService: WalletRecordService
  ) { }

  private cashFlowForm = this.cashFlowFormService.getCashFlowForm();
  private wallets;
  private showNotes = false;
  private showLoading = false;

  private addCashFlowRecord = function ({ value, valid }) {

    if (valid) {
      let wid = this.cashFlowForm.get('wid').value;
      let data = this.covertDate(value);
      this.showLoading = true;

      this.walletRecordService.recordWallet(wid, data).subscribe(() => {
        this.cashFlowForm.controls['amount'].patchValue('');
        this.cashFlowForm.controls['location'].patchValue('');
        this.cashFlowForm.controls['note'].patchValue('');
        this.showNotes = false;
        this.showLoading = false;
      });
    }

  }

  private toggleNotes = function () {
    this.showNotes = !this.showNotes;
  }

  private covertDate = function (value) {
    let transformedDate = value;
    let [year, month, day] = transformedDate.date.split('-');
    transformedDate.timestamp = + new Date(year, (+month - 1), day);
    return transformedDate;
  }

  ngOnInit() {
    this.walletInfoService.userWalletRef(this.status['uid']).subscribe(w => {
      this.wallets = w;
      this.cashFlowFormService.selectList(w);
    });
  }

}