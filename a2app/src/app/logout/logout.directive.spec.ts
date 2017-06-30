import { LogoutDirective } from './logout.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from '../login-page/login-page.service';

describe('LogoutDirective', () => {
  it('should create an instance', () => {

    const loginServiceStub = {};

    TestBed.configureTestingModule({
      providers: [{ provide: LoginService, useValue: loginServiceStub }]
    });

    let loginService = TestBed.get(LoginService);

    const directive = new LogoutDirective(loginService);
    expect(directive).toBeTruthy();
  });
});
