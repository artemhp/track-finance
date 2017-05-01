import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { CashFlow } from "../cash-flow.interface";
import { Observable } from "rxjs";
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

  private optionsCurrency: FirebaseListObservable<any>;
  private optionsFlowType: FirebaseListObservable<any>;
  private optionsCategory: FirebaseListObservable<any>;

  private optionsCategoryList: any;

  private onSubmit = function ({ value, valid }) {
    if (valid) {
      let [year, month, day] = value.date.split('-');
      value.date = new Date(year, (+month - 1), day);
    }
  }

  private onSelectCategory = function () {
    this.optionsCategory.subscribe((el) => {
      this.optionsCategoryList = el;
      setTimeout(() => {
        $('.ui.basic.modal').modal('show');
      }, 0);
    });
  }

  private patchValue = function (name, value) {
    this.cashFlowForm.controls[name].patchValue(value);
  }

  constructor(
    private af: AngularFire,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.optionsCurrency = this.af.database.list('/general/currency');
    this.optionsFlowType = this.af.database.list('/general/flowType');
    this.optionsCategory = this.af.database.list('/general/category');

    this.dateFormatter = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.cashFlowForm = this.fb.group(
      {
        'type': ['income', Validators.required],
        'amount': ['200', Validators.required],
        'currency': ['UAH', Validators.required],
        'category': ['', Validators.required],
        'location': '',
        'date': this.dateFormatter
      }
    );

    Observable.merge(
      this.optionsCurrency,
      this.optionsFlowType
    ).subscribe(function () {
      setTimeout(() => {
        $('.ui.dropdown').dropdown();
      }, 0);
    });
  }
}