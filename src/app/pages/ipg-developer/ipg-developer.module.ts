import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IpgDeveloperRoutingModule } from './ipg-developer-routing.module';
import { IpgDeveloperComponent } from './apps/ipg-developer.component';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbChatModule, NbCheckboxModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRadioModule, NbRouteTabsetModule, NbSelectModule, NbSpinnerModule, NbStepperModule, NbTabsetModule, NbUserModule, NbAccordionModule, NbIconModule, NbDialogModule, NbToggleModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { ImageViewerModule } from 'ng2-image-viewer';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxPaginationModule } from 'ngx-pagination';

import { AddUpdateAppComponent } from './add-update-app/add-update-app.component';
import { ClipboardModule } from 'ngx-clipboard';
import {GatewayService} from '../../@core/services/gateway.service';
import { UpdateAppComponent } from './update-app/update-app.component';

@NgModule({
  declarations: [IpgDeveloperComponent, AddUpdateAppComponent, UpdateAppComponent],
  imports: [
    CommonModule,
    NbSpinnerModule,
    IpgDeveloperRoutingModule,
   
    FormsModule,
    NbBadgeModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbListModule,
    NbIconModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbTabsetModule,
    
    NbRadioModule,
  
    NbCheckboxModule,
    NbSelectModule,
    ClipboardModule,
    NbToggleModule,
    NbDatepickerModule,
    NbCardModule,
    QRCodeModule,
    NgxPaginationModule,
    NbDialogModule,
    NbUserModule,
    NgxCurrencyModule,
    NbChatModule,
    NbPopoverModule,
    NbCheckboxModule,
    NbSelectModule,
    ImageViewerModule, 
  ], 
  providers:[
    GatewayService
  ]
})
export class IpgDeveloperModule { }
