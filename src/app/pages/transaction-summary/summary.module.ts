import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { SummaryTransactionHistoryRoutingModule } from './sammary-routing.module';
import { TransactionSummaryComponent } from './transaction-summary.component';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
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
    SummaryTransactionHistoryRoutingModule,
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
    TransactionSummaryComponent
  ],
  entryComponents: []
})
export class summaryTransactionHistoryModule { }
