import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    window.setTimeout(()=>{
      this.selectOptionsCashFlow = [
        {value:'Income',name:"Income"},
        {value:'Expence',name:"Expence"}
      ]
    },100);
    window.setTimeout(()=>{
      this.selectOptionsCurrency = [
        {value:'UAH',name:"UAH"},
        {value:'USD',name:"USD"},
        {value:'EUR',name:"EUR"}
      ]
    },100);

    $('.modal').modal();
  }

}
