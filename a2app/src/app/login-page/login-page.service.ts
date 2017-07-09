import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StatusService } from '../core/status.service';
import { GenerateWalletService } from "../wallet/wallet-create/generate-wallet.service";
import 'rxjs/add/operator/do';

@Injectable()
export class LoginService {

  constructor(
    public af: AngularFire,
    public status: StatusService,
    public router: Router,
    public createfirstwallet: GenerateWalletService
  ) { }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google
    });
  }

  redirect(byDefault) {
    if (this.status.redirectUrl == '/login') {
      return byDefault;
    }
    return this.status.redirectUrl || byDefault;
  }

  userInfo = this.af.auth.do((val) => {
    if (val && val.uid) {
      this.status.isLoggedIn = true;
      this.status.uid = val.uid;
      this.createfirstwallet.generateWallet(this.status.uid, 'Cash')
        .subscribe((e) => {
          console.log(e);
        }, err => {
          console.log(err.message);
        });

    }
  });

  logout() {
    this.af.auth.logout();
  }

}