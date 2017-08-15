import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StatusService } from '../core/status.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { GenerateWalletService } from "../wallet/wallet-create/generate-wallet.service";
import { UserCreateService } from "../user/user-create.service";
import 'rxjs/add/operator/do';
import * as firebase from 'firebase';


@Injectable()
export class LoginService {

  constructor(
    public afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public status: StatusService,
    public router: Router,
    public userCreateService: UserCreateService,
    public createfirstwallet: GenerateWalletService
  ) { }


  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider).then((el) => {
      firebase.auth().getRedirectResult().then(result => {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(token, user);
      }).catch(function (error) {
        // Handle Errors here.
        console.log(error.message);
      });
    });
  }

  redirect(byDefault) {
    if (this.status.redirectUrl == '/login') {
      return byDefault;
    }
    return this.status.redirectUrl || byDefault;
  }

  userInfo = val => {
    if (val && val.uid) {

      this.userCreateService.userCreate(val).subscribe((e) => {
        console.log(e);
      }, err => {
        console.log(err.message);
      });

      this.status.isLoggedIn = true;
      this.status.uid = val.uid;
      this.status.email = val.email;
      this.status.name = val.displayName;

      this.createfirstwallet.generateWallet(this.status.uid, 'First Wallet', this.status.name).subscribe((e) => {
        console.log(e);
      }, err => {
        console.log(err.message);
      });

    }
  };

  logout() {
    this.afAuth.auth.signOut();
  }

}