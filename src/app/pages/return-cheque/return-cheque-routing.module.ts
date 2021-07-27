import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ReturnChequeComponent} from './return-cheque.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnChequeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnChequeRoutingModule {
}
