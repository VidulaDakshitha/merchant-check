/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import {BreadcrumbModule} from 'angular-crumbs';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// import { AlertModule, PopoverModule } from 'ngx-bootstrap';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TabsModule } from 'ngx-bootstrap/tabs';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';




import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbButtonModule,
  NbInputModule,
  NbAccordionModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
  NbRadioModule,
  NbCheckboxModule,
  NbSelectModule,
  NbCardModule,
  NbLayoutModule,
  NbPopoverModule,
  NbSpinnerModule,
  NbThemeModule,
 
  
} from '@nebular/theme';

import {LoginComponent} from './layout/login/login.component'
import { from } from 'rxjs';
import { AdminLoginComponent } from './layout/admin-login/admin-login.component';

import {TransactionHistoryService} from '../app/@core/services/transaction-history.service'
import {CommonService} from './@core/services/common.service';
import {AuthGuard} from './@core/guards/auth.guard';
import  {AccessGuard} from './@core/guards/assess.guard'
import {PdfExportService} from './@core/services/pdf-export.service'
import {DashboardService} from './@core/services/dashboard.service'
import { WebSocketService} from './@core/services/sockets.service'

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './@core/services/token.interceptor';
import { ConfirmMerchantComponent } from './layout/confirm-merchant/confirm-merchant.component';
import { OnepayAgreementComponent } from './layout/confirm-merchant-agreements/onepay-agreement/onepay-agreement.component';
import { BankAgreementComponent } from './layout/confirm-merchant-agreements/bank-agreement/bank-agreement.component';
import { AdminPasswordResetComponent } from './layout/admin-password-reset/admin-password-reset.component';
import { DatePipe } from '@angular/common';
import { ResetPwEmailComponent } from './layout/forgotten-pw-merchant/reset-pw-email/reset-pw-email.component';
import { OtpVerrificationComponent } from './layout/forgotten-pw-merchant/otp-verrification/otp-verrification.component';
import { ConformPwComponent } from './layout/forgotten-pw-merchant/conform-pw/conform-pw.component';
import { AgmCoreModule } from '@agm/core';
import { MerchantSubmitApplicationComponent } from './layout/merchant-submit-application/merchant-submit-application.component';
import { SelfRegistrationMerchantComponent } from './layout/self-registration-merchant/self-registration-merchant.component';
import { ClipboardModule } from 'ngx-clipboard';

import { SharedDirectiveModule } from "./_directives/shared_directive.module";
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [AppComponent, SelfRegistrationMerchantComponent, LoginComponent, AdminLoginComponent, ConfirmMerchantComponent, OnepayAgreementComponent, BankAgreementComponent, AdminPasswordResetComponent, ResetPwEmailComponent, OtpVerrificationComponent, ConformPwComponent, MerchantSubmitApplicationComponent],

  // declarations: [AppComponent, SelfRegistrationMerchantComponent, LoginComponent, AdminLoginComponent, ConfirmMerchantComponent, OnepayAgreementComponent, BankAgreementComponent, AdminPasswordResetComponent, ResetPwEmailComponent, OtpVerrificationComponent, ConformPwComponent, MerchantSubmitApplicationComponent,OpDataTableComponent],
  imports: [
    SharedDirectiveModule,
    BreadcrumbModule,
    NbLayoutModule,
    ThemeModule,
    NbMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    ClipboardModule,
    NbListModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbCheckboxModule,
    NbSelectModule,
    NbDatepickerModule,
    NbCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NbPopoverModule,
    // NgxPaginationModule,
    // BsDropdownModule.forRoot(),
    // AlertModule.forRoot(),
    // PopoverModule.forRoot(),
    // TabsModule.forRoot(),
    // TooltipModule.forRoot(),


    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCY7NipnOpjVFeyNxuI8xW8u9-GbPbWCUE',
      libraries: ['places']
    }),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    NbSpinnerModule,
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbThemeModule.forRoot(),
    ModalModule.forRoot(),

  ],
  bootstrap: [AppComponent],
  providers:[
    TransactionHistoryService, 
    CommonService, 
    AuthGuard,
    AccessGuard,
    DashboardService,
    WebSocketService,
    
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    PdfExportService,
    DatePipe,
  ]
})
export class AppModule {
}
