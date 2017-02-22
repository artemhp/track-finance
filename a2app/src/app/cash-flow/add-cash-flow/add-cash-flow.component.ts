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

export class AddCashFlowComponent implements OnInit {

  private cashFlowForm;

  private optionsCurrency: FirebaseListObservable<any>;
  private optionsFlowType: FirebaseListObservable<any>;
  private optionsCategory: FirebaseListObservable<any>;

  private onSubmit = function ({ value, valid }) {
    if (valid) {
      let [year, month, day] = value.date.split('-');
      value.date = new Date(year, (+month - 1), day);
    }
  }

  constructor(
    private af: AngularFire,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.optionsCurrency = this.af.database.list('/currency');
    this.optionsFlowType = this.af.database.list('/flowType');
    this.optionsCategory = this.af.database.list('/category');

    this.cashFlowForm = this.fb.group(
      {
        'type': ['Income', Validators.required],
        'amount': ['200', Validators.required],
        'currency': ['UAH', Validators.required],
        'category': ['', Validators.required],
        'date': this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      }
    );

    this.cashFlowForm.valueChanges.subscribe(function (el) {
      console.log(el);
    });

    $('.modal').modal();

  }

}
