import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { QrTransactionHistoryRoutingModule } from './qr-transaction-history-routing.module';
import { QrTransactionHistoryComponent } from './qr-transaction-history.component';
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
    QrTransactionHistoryRoutingModule,
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
    NgxPaginationModule
  ],
  declarations: [
    QrTransactionHistoryComponent
  ],
  entryComponents: []
})
export class QrTransactionHistoryModule { }
