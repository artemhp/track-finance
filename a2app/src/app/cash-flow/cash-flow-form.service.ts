import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
declare var $: any;

@Injectable()
export class CashFlowFormService {

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe) {
  }

  public changeCashFlowForm = function (name, value) {
    this.cashFlowForm.controls[name].patchValue(value);
  }

  public selectList(wallets) {
    let wid = this.getWalletId(wallets);
    this.changeCashFlowForm('wid', wid);
    this.changeCashFlowForm('title', this.getWalletIdFromTitle(wallets, wid));
    setTimeout(() => $('.ui.dropdown').dropdown(), 0)
  }

  public getWalletId(list) {
    if (list.length)
      return localStorage.getItem('wallet:id') || list[0]['$key'];
  }

  public getWalletIdFromTitle(list, wid) {
    let wTitleArray = list.filter(w => w['$key'] == wid);
    if (wTitleArray.length)
      return wTitleArray[0]['title'];
  }

  private cashFlowValues = {
    'type': 'income',
    'amount': '',
    'currency': 'UAH',
    'category': '',
    'location': '',
    'title': '',
    'wid': '',
    'note': '',
    'date': this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  };

  public cashFlowForm;

  public getCashFlowForm() {
    return this.cashFlowForm = this.fb.group({
      'type': [this.cashFlowValues.type, Validators.required],
      'amount': [this.cashFlowValues.amount, Validators.required],
      'currency': [this.cashFlowValues.currency, Validators.required],
      'category': ['', Validators.required],
      'categoryId': ['', Validators.required],
      'location': '',
      'title': '',
      'wid': '',
      'note': '',
      'date': this.cashFlowValues.date
    });
  }

}
