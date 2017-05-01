import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class LoginService {

  constructor(public af: AngularFire, public router: Router) { }

  isLoggedIn = false;
  redirectUrl: string;

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google
    });
  }

  redirect(byDefault) {
    if (this.redirectUrl == '/login') {
      return byDefault;
    }
    return this.redirectUrl || byDefault;
  }

  userInfo = this.af.auth.do((val) => {
    
    const userWalletRef = this.af.database.list('/users/'+val.uid+'/wallets');
    const walletRef = this.af.database.list('/wallets');    
    const walletObj = {
      'money': 0, 
      'transactions': 0
    };
    const cat = [
      'Communcation, PC',
      'Financial Expernses',
      'Food and Drinks',
      'Housing Income',
      'Transportation'
    ];

    function pushCategories (wallet) {
      let pr = [];
      const categoriesRef = wallet.ref.child('category');          
      for (let i in cat) {
        let category = categoriesRef.push({
          'name': cat[i],
          'count': 0,
          'uid': val.uid
        });
        pr.push(category);
      }
      return Promise.all(pr).then(() => wallet.getKey());
    }

    userWalletRef
      .take(1)
      .filter(w => !w.length)
      .flatMap((w) => walletRef.push(walletObj).then(w => pushCategories(w)))
      .flatMap((w) => userWalletRef.push(w))      
      .subscribe((el) => console.log(el)); 

    // const categoriesRef = this.af.database.list('/categories/');
    // const usersRef = this.af.database.list('/users/'+val.uid+'/categories');

    // const cat = [
    //   'Communcation, PC',
    //   'Financial Expernses',
    //   'Food and Drinks',
    //   'Housing Income',
    //   'Transportation'
    //   ];

    //   function pushToCategory (e) {        
    //     let pr = [];
    //     for (let i in cat) {
    //       let category = categoriesRef.push({
    //         'name': cat[i],
    //         'count': 0,
    //         'parent': '',
    //         'uid': val.uid
    //       });
    //       pr.push(category);
    //     }        
    //     return Promise.all(pr); 
    //   }
    
    // usersRef
    //   .take(1)
    //   .filter(el => !el.length)
    //   .flatMap(() => pushToCategory(cat))
    //   .map(el => el['key'])
    //   .subscribe((el) => {        
    //     console.log(el);
    //     }
    //   );  

    this.isLoggedIn = true;  
      
  });

  logout() {
    this.af.auth.logout();
  }

}