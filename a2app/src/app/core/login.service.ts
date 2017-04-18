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
    this.isLoggedIn = true;
  });

  logout() {
    this.af.auth.logout();
  }

}