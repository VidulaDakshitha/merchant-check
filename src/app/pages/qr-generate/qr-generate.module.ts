import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { QrGenerateRoutingModule } from './qr-generate.routing';
import { QrGenerateComponent } from './qr-generate.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    QrGenerateRoutingModule,
    QRCodeModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
  declarations: [
    QrGenerateComponent
  ],
})
export class qrgenerateModule { }
