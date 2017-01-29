import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
declare var $:any;

@Component({
  selector: 'app-add-cash-flow',
  templateUrl: './add-cash-flow.component.html',
  styleUrls: ['./add-cash-flow.component.css']
})
export class AddCashFlowComponent implements OnInit {

  private selectOptionsCashFlow = [];
  private selectOptionsCurrency = [];

  private selectedOptionCashFlow;
  private selectedOptionCurrency;

  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
  }

  ngOnInit() {
    window.setTimeout(()=>{
      this.selectOptionsCashFlow = [
        "Income",
        "Expence"
      ]
    },100);
    window.setTimeout(()=>{
      this.selectOptionsCurrency = [
        'UAH',
        'USD',
        'EUR'
      ]
    },100);

    $('.modal').modal();
  }

}
