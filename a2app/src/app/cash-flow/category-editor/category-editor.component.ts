import { debuglog } from 'util';
import { Component, OnInit, Input } from '@angular/core';
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
  private selectedCategory = 'test';

  @Input() wallet;
  constructor(
    private cashFlowFormService: CashFlowFormService
  ) { }

  private onSelectedCategory(title) {
    this.cashFlowFormService.changeCashFlowForm('category', title);
    setTimeout(() => { $('.ui.basic.modal').modal('hide') }, 0);
  }
  private openCategoryList = function () {
    setTimeout(() => { $('.ui.basic.modal').modal('show') }, 0);
  }

  private categoryTitle = '';

  ngOnInit() {
    this.cashFlowFormService.cashFlowForm.get('category').valueChanges.subscribe(data => {
      this.categoryTitle = data;
    });
  }

}