import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { CashFlowFormService } from "../cash-flow-form.service";

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.css']
})
export class CategoryEditorComponent implements OnInit {

  private optionsCategoryList: any;
  private getCurrentCategoryValue = () => this.cashFlowFormService.cashFlowForm.get('category').value;
  private checkCurrentCategory = title => this.getCurrentCategoryValue() == title;

  @Input() categoryForm;
  constructor(private af: AngularFire, private cashFlowFormService: CashFlowFormService) { }

  private onSelectCategory = function () {
    $('.ui.basic.modal').modal('show');
    const walletId = this.cashFlowFormService.cashFlowForm.get('walletId').value;
    this.af.database.list('/wallets/' + walletId + '/category')
      .subscribe(list => this.optionsCategoryList = list);
  }

  private submitCategory = function (title) {
    this.cashFlowFormService.changeCashFlowForm('category', title);
    $('.ui.basic.modal').modal('hide');
  }

  private categoryTitle = '';


  ngOnInit() {
    this.cashFlowFormService.cashFlowForm.get('category').valueChanges.subscribe(data => {
      this.categoryTitle = data;
      console.log(data);
    });
  }

}