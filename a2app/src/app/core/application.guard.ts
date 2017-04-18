import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../core/login.service';

@Injectable()
export class ApplicationGuard implements CanActivate {
  constructor(public router: Router, public loginService: LoginService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url) {
    console.log(this.loginService.isLoggedIn);
    if (this.loginService.isLoggedIn) {
      return true
    };
    this.loginService.redirectUrl = url;
    return false;
  }
}