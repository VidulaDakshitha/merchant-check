import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {OpDataTableComponent} from './op-data-table/op-data-table.component';
import {
    NbCardModule
  } from "@nebular/theme";


@NgModule({  
  declarations: [OpDataTableComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule
  ],
  exports:[OpDataTableComponent]
})
export class SharedDirectiveModule { }
