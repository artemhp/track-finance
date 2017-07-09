import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { StatusService } from '../../core/status.service'

@Injectable()
export class CategoryCreateService {

  constructor(private af: AngularFire, private statusService: StatusService) { }

  pushCategories = function (wallet, uid, cat) {
    let categoryPromises = [];
    cat.map(category => {
      let obj = {
        'title': category['title'],
        'icon': category['img'],
        'total': { 'items': 0, 'sum': 0 },
        'user': uid
      };
      categoryPromises.push(this.af.database.list('/wallets/' + wallet + '/category').push(obj));
    });
    return Promise.all(categoryPromises).then(() => wallet);
  };

}
