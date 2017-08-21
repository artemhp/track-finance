import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnChanges {

  @Input() wallet;
  @Output() onSelectCategory = new EventEmitter();
  @Output() onListLoad = new EventEmitter();

  private optionsCategoryList;

  constructor(
    private afDB: AngularFireDatabase,
  ) { }

  ngOnChanges() {
    if (this.wallet) {
      this.afDB.list('/wallets/' + this.wallet + '/category').subscribe(list => {
        this.optionsCategoryList = list;
        this.onListLoad.emit();
      });
    }
  }

  private selectCategory(category) {
    this.onSelectCategory.emit(category);
  }

  ngOnInit() {
    console.log(this.wallet);
  }

}
