import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CashFlowFormService } from "../cash-flow-form.service";

declare var $;

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.css']
})
export class CategoryEditorComponent implements OnInit {

  private optionsCategoryList: any;
  private getCurrentCategoryValue = () => this.cashFlowFormService.cashFlowForm.get('category').value;
  private checkCurrentCategory = title => this.getCurrentCategoryValue() == title;

  @Input() wallet;
  constructor(
    private afDB: AngularFireDatabase,
    private cashFlowFormService: CashFlowFormService
  ) { }

  private onSelectCategory = function () {
    this.afDB.list('/wallets/' + this.wallet + '/category').subscribe(list => {
      this.optionsCategoryList = list;
      setTimeout(() => { $('.ui.basic.modal').modal('show') }, 0);
    });
  }

  private submitCategory = function (title) {
    this.cashFlowFormService.changeCashFlowForm('category', title);
    setTimeout(() => { $('.ui.basic.modal').modal('hide') }, 0);
  }

  private categoryTitle = '';

  ngOnInit() {
    this.cashFlowFormService.cashFlowForm.get('category').valueChanges.subscribe(data => {
      this.categoryTitle = data;
    });
  }

}