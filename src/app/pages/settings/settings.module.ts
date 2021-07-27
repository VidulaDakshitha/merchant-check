import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { BusinessTypeComponent } from './business-type/business-type.component';
import { BankComponent } from './bank/bank.component';
import { SettingsRoutingModule } from './settings.module.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbMenuModule, NbButtonModule, NbInputModule, NbAccordionModule, NbListModule, NbRouteTabsetModule, NbStepperModule, NbTabsetModule, NbRadioModule, NbCheckboxModule, NbSelectModule, NbDatepickerModule, NbCardModule, NbUserModule, NbChatModule, NbPopoverModule, NbSpinnerDirective, NbSpinnerModule } from '@nebular/theme';
import { BreadcrumbModule } from 'angular-crumbs';
import { QRCodeModule } from 'angularx-qrcode';
import { ImageViewerModule } from 'ng2-image-viewer';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxPaginationModule } from 'ngx-pagination';
import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceModule } from '../e-commerce/e-commerce.module';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { PagesRoutingModule } from '../pages-routing.module';

@NgModule({
  declarations: [BusinessCategoryComponent, BusinessTypeComponent,  BankComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
 
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbListModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbTabsetModule,
    NbRadioModule,
    NbCheckboxModule,
    NbSelectModule,
    NbDatepickerModule,
    NbCardModule,
    QRCodeModule,
    NgxPaginationModule,
    NbUserModule,
    NgxCurrencyModule,
    NbChatModule,
    NbPopoverModule,
    ImageViewerModule,
    NbSpinnerModule
    
  ]
})
export class SettingsModule { }
