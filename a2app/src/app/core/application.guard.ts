import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StatusService } from '../core/status.service';

@Injectable()
export class ApplicationGuard implements CanActivate {
  constructor(
    public router: Router,
    public status: StatusService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url) {
    if (this.status.isLoggedIn) {
      return true;
    }
    this.status.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}