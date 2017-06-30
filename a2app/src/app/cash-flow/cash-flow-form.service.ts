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
    'amount': '200',
    'currency': 'UAH',
    'category': '',
    'location': '',
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
      'date': this.cashFlowValues.date
    });
  }

}
