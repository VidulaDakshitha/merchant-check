import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ChequeBookComponent} from './cheque-book.component';

const routes: Routes = [
  {
    path: '',
    component: ChequeBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class chequeBookRoutingModule {
}
