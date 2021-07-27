import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QrTransactionHistoryComponent } from './qr-transaction-history.component';

const routes: Routes = [
  {
    path: '',
    component: QrTransactionHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrTransactionHistoryRoutingModule {
}
