import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FirebaseWalletService {

  constructor(private af: AngularFire) { }

  private pushCategories = function (wallet, uid) {
    let cat = this.af.database.list('/default/category');
    return cat.flatMap(category => {
      category.map((cat) => {
        let obj = {
          'title': cat['title'],
          'icon': 'rocket',
          'total': { 'items': 0, 'sum': 0 },
          'user': uid
        };
        let pushCategoryToWallet = this.af.database.list('/wallets/' + wallet + '/category').push(obj);
        return pushCategoryToWallet;
      });
      return Promise.all(category).then(() => wallet);
    })
  };

  private validateWallet = (wallet, title) => {
    if (wallet.length) {
      wallet.map(checkUnique => {
        if (checkUnique.title == title)
          throw new Error('Wallet is already exist')
        return checkUnique;
      });
    }
    return wallet;
  };

  generateWallet = (uid, title) => {
    const userWalletRef = this.af.database.list('/users/' + uid + '/wallets');
    return userWalletRef.take(1)
      // Check Wallet with this title is already exist.
      .map(w => this.validateWallet(w, title))
      // Add Wallet to root.users
      .flatMap(w => userWalletRef.push({ 'title': title }).then(w => w.getKey())) // "-KkEzhgeMJNOFORWHtO-"
      // Add Wallet to root.wallets
      .flatMap(w => this.af.database.object('/wallets/' + w).set({ 'money': 0, 'transactions': 0, 'users': { [uid]: true } }).then(() => w)) // "-KkEzhgeMJNOFORWHtO-"
      // Set default categories to root.wallets['-KkEzhgeMJNOFORWHtO-']
      .flatMap(w => this.pushCategories(w, uid)) // "-KkEzhgeMJNOFORWHtO-"      
  }

  generateDafault = () =>
    this.af.database.object('/default/category').set([
      { 'title': 'Communcation, PC', 'img': 'rocket' },
      { 'title': 'Financial Expernses', 'img': 'rocket' }
    ]);

}
