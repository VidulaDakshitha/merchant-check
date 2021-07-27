import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { NgxCurrencyModule } from "ngx-currency";
import { ThemeModule } from '../../@theme/theme.module';
import {ReceiveChequeComponent} from './receive-cheque.component';
import {receiveChequeRoutingModule} from './receive-cheque.routing';
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
    receiveChequeRoutingModule,
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
    ReceiveChequeComponent
  ],
  entryComponents: []
})
export class receiveChequeModule { }
