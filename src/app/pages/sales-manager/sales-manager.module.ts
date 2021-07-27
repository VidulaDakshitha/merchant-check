import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { NgxCurrencyModule } from "ngx-currency";
import { ThemeModule } from '../../@theme/theme.module';
import { SalesManagerRoutingModule } from './sales-manager.routing';
import { SalesManagerComponent } from './sales-manager.component';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {

  NbInputModule,
  NbAccordionModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
  NbRadioModule,
  NbCheckboxModule,
  NbSelectModule,
  NbDatepickerModule,

  NbActionsModule,
  NbPopoverModule,


} from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    SalesManagerRoutingModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbPopoverModule,
    NbDatepickerModule,
    NbTabsetModule, NbUserModule,
    FormsModule, ReactiveFormsModule,
    NbInputModule,
    NbAccordionModule,
    NbListModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbRadioModule,
    NbCheckboxModule,
    NbSelectModule,
    NbActionsModule,
    NgxPaginationModule,
    NgxCurrencyModule
  ],
  declarations: [
    SalesManagerComponent
  ],
  entryComponents: []
})
export class salesManagerModule { }
