import { Injectable } from '@angular/core';
import { WalletLinkService } from '../wallet-link/wallet-link.service';
import { CategoryCreateService } from '../category-create/category-create.service';
import { WalletInfoService } from '../wallet-info/wallet-info.service';
import 'rxjs';

@Injectable()
export class GenerateWalletService {

  constructor(
    private categoryCreateService: CategoryCreateService,
    private walletInfoService: WalletInfoService,
    private walletLinkService: WalletLinkService
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
    { 'title': 'Food & Drinks', 'img': 'rocket' },
    { 'title': 'Shopping', 'img': 'rocket' },
    { 'title': 'Housing', 'img': 'rocket' },
    { 'title': 'Transportation', 'img': 'rocket' },
    { 'title': 'Vehicle', 'img': 'rocket' },
    { 'title': 'Life & Entertainment', 'img': 'rocket' },
    { 'title': 'Communication, PC', 'img': 'rocket' },
    { 'title': 'Finance expenses', 'img': 'rocket' },
    { 'title': 'Investments', 'img': 'rocket' },
    { 'title': 'Income', 'img': 'rocket' }
  ];

  generateWallet = (uid, title, name) => {

    const userWalletRef = this.walletInfoService.userWalletRef(uid);
    const walletRef = this.walletInfoService.walletRef(uid);

    return userWalletRef.take(1)
      // Check Wallet with this title is already exist.
      .map(w => this.validateWallet(w, title))
      // Add Wallet to root.users
      .flatMap(w => userWalletRef.push({ 'title': title }).then(w => w.getKey())) // "-KkEzhgeMJNOFORWHtO-"
      // Add Wallet to root.wallets
      .flatMap(w => this.walletLinkService.addUser(w, uid, name).then(() => w)) // "-KkEzhgeMJNOFORWHtO-"
      // Set default categories to root.wallets['-KkEzhgeMJNOFORWHtO-']
      .flatMap(w => this.categoryCreateService.pushCategories(w, uid, this.cat)) // "-KkEzhgeMJNOFORWHtO-"      
  }

}
