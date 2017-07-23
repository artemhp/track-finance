import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login-page/login-page.service';
declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    // $('.ui.sticky')
    //   .sticky({
    //     context: '#context'
    //   })
    //   ;
  }

  logout() {
    this.loginService.logout();
  }

}