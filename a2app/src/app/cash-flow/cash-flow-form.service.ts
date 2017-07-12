import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Injectable()
export class CashFlowFormService {

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe) {
  }

  public changeCashFlowForm = function (name, value) {
    this.cashFlowForm.controls[name].patchValue(value);
  }

  private cashFlowValues = {
    'type': 'income',
    'amount': '',
    'currency': 'UAH',
    'category': '',
    'location': '',
    'wallet': '',
    'walletId': '',
    'date': this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  };

  public cashFlowForm = this.getCashFlowForm();

  public getCashFlowForm() {
    return this.cashFlowForm = this.fb.group({
      'type': [this.cashFlowValues.type, Validators.required],
      'amount': [this.cashFlowValues.amount, Validators.required],
      'currency': [this.cashFlowValues.currency, Validators.required],
      'category': ['', Validators.required],
      'location': '',
      'wallet': '',
      'walletId': '',
      'date': this.cashFlowValues.date
    });
  }

}
