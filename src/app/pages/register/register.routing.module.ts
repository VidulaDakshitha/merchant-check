import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RegisterComponent } from './register.component';


import { RegisterMerchantComponent } from './register-merchant/register-merchant.component'
import { AddMerchantComponent } from './add-merchant/add-merchant.component'
import { ViewMerchantComponent } from './view-merchant/view-merchant.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Register Merchant',
      breadcrumb: 'Register-Merchant'
    },
    children: [
      {
        path: '',
        component: RegisterMerchantComponent,
        data: {
          title: '',
          breadcrumb: 'Register-Merchant'
        },
      },
      {
        path: 'add',
        component: AddMerchantComponent,
        data: {
          title: 'Add Merchant',
          breadcrumb: 'Add-Merchant'
        },
      },
      {
        path: 'view-merchant/:id',
        component: ViewMerchantComponent,
        data: {
          title: 'view merchant',
          breadcrumb: 'view-merchant'
        },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {
}
