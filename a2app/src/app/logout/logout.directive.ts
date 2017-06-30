import { Directive, HostListener } from '@angular/core';
import { LoginService } from '../login-page/login-page.service';

@Directive({
  selector: '[appLogout]'
})
export class LogoutDirective {

  @HostListener('click') onClick() {
    this.loginService.logout();
  }

  constructor(public loginService: LoginService) { }

}
