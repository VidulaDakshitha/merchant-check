import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ManualTransactionService } from '../../@core/services/manual-transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrComponent } from '../../@theme/components';


@Component({
  selector: 'ngx-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss']
})
export class TransactionSummaryComponent implements OnInit {

  constructor(
     private fb: FormBuilder,
    private manualTransactionService: ManualTransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private toastr: ToastrComponent
  ) { }

  ngOnInit() {
  }

}
