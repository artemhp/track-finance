import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login-page/login-page.service';
import { AngularFireAuth } from 'angularfire2/auth';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public loginService: LoginService, public router: Router, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((el) => {
      loginService.userInfo(el);
      if (!el) {
        this.router.navigate(['/login']);
      } else if (el && el.uid) {
        this.router.navigate([this.loginService.redirect('/dashboard')]);
      }
    });
  }

}