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
import { LoginPageComponent } from './login-page/login-page.component';
import { StatusService } from './core/status.service';
import { CashFlowFormService } from './cash-flow/cash-flow-form.service';

import { CategoryCreateService } from "./wallet/category-create/category-create.service";
import { GenerateWalletService } from "./wallet/wallet-create/generate-wallet.service";

import { LoginService } from './login-page/login-page.service';
import { LogoutDirective } from './logout/logout.directive';
import { CategoryEditorComponent } from './cash-flow/category-editor/category-editor.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [ApplicationGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
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

const ftBase = {
  'apiKey': 'AIzaSyA94rul7WRhLdU_qREV16SfLfMJCFp9js0',
  'authDomain': 'financemonitor-c4def.firebaseapp.com',
  'databaseURL': 'https://financemonitor-c4def.firebaseio.com',
  'storageBucket': 'financemonitor-c4def.appspot.com',
  'messagingSenderId': '976368137034'
}

export const firebaseConfig = {
  apiKey: localStorage.apiKey || ftBase.apiKey,
  authDomain: localStorage.authDomain || ftBase.authDomain,
  databaseURL: localStorage.databaseURL || ftBase.databaseURL,
  storageBucket: localStorage.storageBucket || ftBase.storageBucket,
  messagingSenderId: localStorage.messagingSenderId || ftBase.messagingSenderId
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
    LoginPageComponent,
    LogoutDirective,
    CategoryEditorComponent
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
  providers: [
    DatePipe,
    ApplicationGuard,
    CategoryCreateService,
    GenerateWalletService,
    LoginService,
    StatusService,
    CashFlowFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
