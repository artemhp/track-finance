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

  ngOnInit() {
    this.af.database.list('/default/category').subscribe(list => this.optionsCategoryList = list);
  }

}