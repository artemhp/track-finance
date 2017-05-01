import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';
import { LoginService } from '../core/login.service';
declare var $: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {  

  user = {};

  constructor(public loginService: LoginService, public router: Router) {
    
  }

  login() {
    this.loginService.login();
  }

  

}
