import { Injectable } from '@angular/core';

@Injectable()
export class StatusService {

  constructor() { }
  isLoggedIn = false;
  redirectUrl: string;
  name: string;
  uid: string;
}