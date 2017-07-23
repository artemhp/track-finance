import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { StatusService } from '../../core/status.service'

@Injectable()
export class CategoryCreateService {

  constructor(private afDB: AngularFireDatabase, private statusService: StatusService) { }

  pushCategories = function (wallet, uid, cat) {
    let categoryPromises = [];
    cat.map(category => {
      let obj = {
        'title': category['title'],
        'icon': category['img'],
        'total': { 'items': 0, 'sum': 0 },
        'user': uid
      };
      categoryPromises.push(this.afDB.list('/wallets/' + wallet + '/category').push(obj));
    });
    return Promise.all(categoryPromises).then(() => wallet);
  };

}
