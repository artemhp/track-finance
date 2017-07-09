import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { CategoryCreateService } from '../category-create/category-create.service';
import 'rxjs';

@Injectable()
export class GenerateWalletService {

  constructor(
    private af: AngularFire,
    private categoryCreateService: CategoryCreateService
  ) { }

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

  private cat = [
    { 'title': 'Groceries', 'img': 'rocket' },
    { 'title': 'Clothes & Shoes', 'img': 'rocket' }
  ];

  private walletDefaultParameters = function (uid) {
    return {
      'money': 0,
      'transactions': 0,
      'currency': 'USD',
      'users': {
        [uid]: true
      }
    }

  };

  generateWallet = (uid, title) => {
    const userWalletRef = this.af.database.list('/users/' + uid + '/wallets');
    return userWalletRef.take(1)
      // Check Wallet with this title is already exist.
      .map(w => this.validateWallet(w, title))
      // Add Wallet to root.users
      .flatMap(w => userWalletRef.push({ 'title': title }).then(w => w.getKey())) // "-KkEzhgeMJNOFORWHtO-"
      // Add Wallet to root.wallets
      .flatMap(w => this.af.database.object('/wallets/' + w).set(this.walletDefaultParameters(uid)).then(() => w)) // "-KkEzhgeMJNOFORWHtO-"
      // Set default categories to root.wallets['-KkEzhgeMJNOFORWHtO-']
      .flatMap(w => this.categoryCreateService.pushCategories(w, uid, this.cat)) // "-KkEzhgeMJNOFORWHtO-"      
  }

}
