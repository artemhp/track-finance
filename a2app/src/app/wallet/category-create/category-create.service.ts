import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryCreateService {

  constructor(
    private afDB: AngularFireDatabase
  ) { }

  pushCategories = function (wallet, uid, cat) {
    let categoryPromises = [];
    cat.map(category => {
      let obj = {
        'title': category['title'],
        'icon': category['img'],
        'user': uid
      };
      categoryPromises.push(this.afDB.list('/wallets/' + wallet + '/category').push(obj));
    });
    return Promise.all(categoryPromises).then(() => wallet);
  };

}
