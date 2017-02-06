import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {DatePipe} from '@angular/common'
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {CashFlow} from "../cash-flow";
import {Observable} from "rxjs";
declare var $: any;

@Component({
  selector: 'app-add-cash-flow',
  templateUrl: 'add-cash-flow.component.html',
  styleUrls: ['add-cash-flow.component.css']
})

export class AddCashFlowComponent implements OnInit {

  private addCashFlow: CashFlow;

  private optionsCurrency: FirebaseListObservable<any>;
  private optionsFlowType: FirebaseListObservable<any>;
  private optionsCategory: FirebaseListObservable<any>;

  constructor(private af: AngularFire, private datePipe: DatePipe) {
  }

  ngOnInit() {

    this.optionsCurrency = this.af.database.list('/currency');
    this.optionsFlowType = this.af.database.list('/flowType');
    this.optionsCategory = this.af.database.list('/category');

    this.addCashFlow = new CashFlow(
      'Expence', 100, 'UAH', 'Income', this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    );

    Observable.merge(this.optionsCurrency, this.optionsFlowType).subscribe(function () {
      setTimeout(() => {
        $('select').material_select();
      }, 0);
    });

    $(document).ready(function () {
      $('.modal').modal();
    });

  }

}
