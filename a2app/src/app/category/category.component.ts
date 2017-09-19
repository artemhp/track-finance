import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category;
  @Input() wallet;

  private categoryDisplay;

  constructor(
    private afDB: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.categoryDisplay = this.afDB.object('/wallets/' + this.wallet + '/category/' + this.category);
  }

}
