import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BankComponent } from './bank/bank.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { BusinessTypeComponent } from './business-type/business-type.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bank',
        component: BankComponent,
      },
      {
        path: 'business-category',
        component: BusinessCategoryComponent,
      },
      {
        path: 'business-type',
        component: BusinessTypeComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {
}
