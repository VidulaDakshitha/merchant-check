import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './layout/login/login.component'
import { AdminLoginComponent } from './layout/admin-login/admin-login.component'
import {ConfirmMerchantComponent} from './layout/confirm-merchant/confirm-merchant.component'
import { AuthGuard } from './@core/guards/auth.guard';
import  {AccessGuard} from './@core/guards/assess.guard';
import { AdminPasswordResetComponent } from './layout/admin-password-reset/admin-password-reset.component';
import { ConformPwComponent} from './layout/forgotten-pw-merchant/conform-pw/conform-pw.component'
import { ResetPwEmailComponent } from './layout/forgotten-pw-merchant/reset-pw-email/reset-pw-email.component';
import { OtpVerrificationComponent } from './layout/forgotten-pw-merchant/otp-verrification/otp-verrification.component';
import { MerchantSubmitApplicationComponent} from './layout/merchant-submit-application/merchant-submit-application.component';
import { SelfRegistrationMerchantComponent} from './layout/self-registration-merchant/self-registration-merchant.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminLoginComponent,
  },
  {
    path: 'admin-pw',
    component: AdminPasswordResetComponent,
  },

  {
    path: 'confirm-merchant',
    component: ConfirmMerchantComponent,
  },
  //merchant forgotten pw
  
  {
    path: 'reset-password',
    component: ResetPwEmailComponent,
  },
  {
    path: 'otp-verification',
    component: OtpVerrificationComponent,
  },
  {
    path: 'reset-confirm-password',
    component: ConformPwComponent,
  },
  
   //merchant submit application
  {
    path: 'submit-application',
    component:MerchantSubmitApplicationComponent
  },

  //merchant self regisration
  {
    path: 'self-registration-merchant',
    component:SelfRegistrationMerchantComponent
  },
  


  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
