import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { CashFlow } from "../cash-flow.interface";
import { Observable } from "rxjs";
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

  private optionsCurrency: FirebaseListObservable<any>;
  private optionsFlowType: FirebaseListObservable<any>;
  //private optionsCategory: FirebaseListObservable<any>;



  private onSubmit = function ({ value, valid }) {
    if (valid) {
      let [year, month, day] = value.date.split('-');
      value.date = new Date(year, (+month - 1), day);
    }
  }

  private onSelectCategory = function () {
    setTimeout(() => $('.ui.basic.modal').modal('show'), 0);
  }

  constructor(
    private af: AngularFire,
    private cashFlowFormService: CashFlowFormService
  ) { }

  ngOnInit() {

    this.optionsCurrency = this.af.database.list('/default/currency');
    this.optionsFlowType = this.af.database.list('/default/flowType');
    //this.optionsCategory = this.af.database.list('/default/category');    

    this.cashFlowForm = this.cashFlowFormService.getCashFlowForm();

    Observable.merge(this.optionsCurrency, this.optionsFlowType).subscribe(() => setTimeout(() => $('.ui.dropdown').dropdown(), 0)
    );
  }
}