import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SummaryaAllTransactionComponent} from './summarya-all-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryaAllTransactionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class transacionAllSummaryRoutingModule {
}
