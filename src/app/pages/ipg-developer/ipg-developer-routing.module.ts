import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUpdateAppComponent } from './add-update-app/add-update-app.component';
import { IpgDeveloperComponent } from './apps/ipg-developer.component';
import { UpdateAppComponent } from './update-app/update-app.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:  'app',
        component: IpgDeveloperComponent,
      },
      {
        path:  'app/add',
        component: AddUpdateAppComponent,
      },
      {
        path:  'app/update/:appid',
        component: UpdateAppComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpgDeveloperRoutingModule { }
