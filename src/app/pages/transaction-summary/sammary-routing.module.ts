import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionSummaryComponent } from './transaction-summary.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionSummaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryTransactionHistoryRoutingModule {
}
