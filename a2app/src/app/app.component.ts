import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders } from 'angularfire2';
import { LoginService } from './core/login.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public loginService: LoginService, public router: Router) {
    this.loginService.userInfo.subscribe((el) => {
      if (!el) {
        this.router.navigate(['/login']);
      } else if (el && el.uid) {
        this.router.navigate([this.loginService.redirect('/dashboard')]);
      }
    });
  }

  logout() {
    this.loginService.logout();
  }

}