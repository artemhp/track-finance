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

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
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
import { WalletInfoService } from "./wallet/wallet-info/wallet-info.service";

import { ShareWalletFormService } from "./settings/share-wallet-form.service";

import { LoginService } from './login-page/login-page.service';
import { LogoutDirective } from './logout/logout.directive';
import { CategoryEditorComponent } from './cash-flow/category-editor/category-editor.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [ApplicationGuard]
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
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
  apiKey: "AIzaSyBs2rH4kaW2qQU8hAPkLm669zOQNkj5V0I",
  authDomain: "finance-tracker-d9c2f.firebaseapp.com",
  databaseURL: "https://finance-tracker-d9c2f.firebaseio.com",
  projectId: "finance-tracker-d9c2f",
  storageBucket: "finance-tracker-d9c2f.appspot.com",
  messagingSenderId: "242139475776"
}

export const firebaseConfig = {
  apiKey: localStorage.apiKey || ftBase.apiKey,
  authDomain: localStorage.authDomain || ftBase.authDomain,
  databaseURL: localStorage.databaseURL || ftBase.databaseURL,
  projectId: localStorage.projectId || ftBase.projectId,
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
    CategoryEditorComponent,
    SettingsPageComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
    CashFlowFormService,
    WalletInfoService,
    ShareWalletFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
