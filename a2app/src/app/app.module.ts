import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';

import { AngularFireModule } from 'angularfire2';
import {DatePipe} from "@angular/common";
import {AddCashFlowComponent} from "./cash-flow/add-cash-flow/add-cash-flow.component";

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyA94rul7WRhLdU_qREV16SfLfMJCFp9js0",
  authDomain: "financemonitor-c4def.firebaseapp.com",
  databaseURL: "https://financemonitor-c4def.firebaseio.com",
  storageBucket: "financemonitor-c4def.appspot.com",
  messagingSenderId: "976368137034"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LineChartComponent,
    AddCashFlowComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    ChartsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
