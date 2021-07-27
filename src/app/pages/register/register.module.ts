import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register.routing.module';
// import { RegisterComponent } from './register.component';
import {AddMerchantComponent} from './add-merchant/add-merchant.component';
import {RegisterMerchantComponent} from './register-merchant/register-merchant.component';
import {ViewMerchantComponent} from './view-merchant/view-merchant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';

import {
  NbAccordionModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
  NbRadioModule,
  NbCheckboxModule,
  NbSelectModule,
  NbDatepickerModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    RegisterRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbRadioModule,
    NbCheckboxModule,
    NbSelectModule,
    NbDatepickerModule,
    NgxPaginationModule
  ],
  declarations: [
    // RegisterComponent
    AddMerchantComponent,
    RegisterMerchantComponent,
    ViewMerchantComponent
    
  ],

  bootstrap: [ RegisterMerchantComponent, AddMerchantComponent,ViewMerchantComponent ]
})
export class RegisterModule { }
