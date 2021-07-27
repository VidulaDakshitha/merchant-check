import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QrGenerateComponent } from './qr-generate.component';

const routes: Routes = [
  {
    path: '',
    component: QrGenerateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrGenerateRoutingModule {
}
