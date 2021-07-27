import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ReceiveChequeComponent} from './receive-cheque.component';

const routes: Routes = [
  {
    path: '',
    component: ReceiveChequeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class receiveChequeRoutingModule {
}
