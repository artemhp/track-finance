import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-page/login-page.service';
import { StatusService } from "../core/status.service";
declare var $: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  user = {};

  constructor(
    public loginService: LoginService,
    public router: Router,
    public status: StatusService
  ) {

  }

  login() {
    this.loginService.login();
  }


}
