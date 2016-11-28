import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {PurchaseFormComponent} from './purchase/purchase-form.component.ts';
import { AngularFireModule } from 'angularfire2';



// Initialize Firebase
export const firebaseConfig  = {
  apiKey: "AIzaSyA94rul7WRhLdU_qREV16SfLfMJCFp9js0",
  authDomain: "financemonitor-c4def.firebaseapp.com",
  databaseURL: "https://financemonitor-c4def.firebaseio.com",
  storageBucket: "financemonitor-c4def.appspot.com",
  messagingSenderId: "976368137034"
};

@NgModule({
  declarations: [
    AppComponent,
    PurchaseFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
