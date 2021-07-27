import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {IssueChequeComponent} from './issue-cheque.component';

const routes: Routes = [
  {
    path: '',
    component: IssueChequeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class issueChequeRoutingModule {
}
