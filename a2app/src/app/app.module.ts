import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { DatePipe } from "@angular/common";
import { AddCashFlowComponent } from "./cash-flow/add-cash-flow/add-cash-flow.component";
import { ListCashFlowComponent } from './cash-flow/list-cash-flow/list-cash-flow.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';

import { ApplicationGuard } from './core/application.guard';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LoginService } from './core/login.service';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [ApplicationGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ApplicationGuard]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canActivate: [ApplicationGuard]
  },
  { path: '**', component: DashboardPageComponent }
];

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
    AddCashFlowComponent,
    ListCashFlowComponent,
    DashboardPageComponent,
    LoginPageComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    ChartsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DatePipe, ApplicationGuard, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
