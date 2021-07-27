import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesManagerComponent } from './sales-manager.component';

const routes: Routes = [
  {
    path: '',
    component: SalesManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesManagerRoutingModule {
}
