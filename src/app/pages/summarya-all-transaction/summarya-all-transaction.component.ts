import { Component, OnInit } from '@angular/core';
import { TransactionHistoryService } from '../../@core/services/transaction-history.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrComponent } from '../../@theme/components';

@Component({
  selector: 'ngx-summarya-all-transaction',
  templateUrl: './summarya-all-transaction.component.html',
  styleUrls: ['./summarya-all-transaction.component.scss']
})
export class SummaryaAllTransactionComponent implements OnInit {
  p: number = 1;
  total: number = 0;
  pageSize: number = 10;
  search_by_manual = 0;
  
  transaction_all_history_list: any[]
  userMessage
  date_transaction
  date
  start
  end
  date_range
  is_loading = false
    
  constructor(
    private transactionHistoryService: TransactionHistoryService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private toastr: ToastrComponent
  ) { }

  ngOnInit() {

    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }

    this.pageChangedHistory(1)
  }
formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

pageChangedHistory(newPage: any) {
  this.p = newPage
  this.getTransactionAllHistoryData(this.p,this.pageSize);
}
//manual search fuction
search_data() {
  
  this.is_loading = true
  if (this.date_range) {
    let start = this.formatDate(this.date_range['start'])
    let end
    if (this.date_range['end']) {
      end = this.formatDate(this.date_range['end'])
    } else {
      end = this.formatDate(this.date_range['start'])
    }


    this.getTransactionAllHistoryData(1,this.pageSize, start, end)
    console.log(start, end)
  } else {
    this.is_loading = false
    this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
  }

}

// get Transaction history data
getTransactionAllHistoryData(p,pageSize, start_date = "", end_date = "") {
  console.log('all transaction history')
  this.transaction_all_history_list = [] = []
    this.is_loading = true
    this.transactionHistoryService.getSummaryAllTransactionHistoryByTransactionDate(this.p, this.pageSize,start_date, end_date).then(
      res => {
        this.is_loading = false
        if (res['success']) {
          this.transaction_all_history_list = res['data']['transaction_data'];
          this.total = res['data']['count'];
          console.log('all history', this.transaction_all_history_list)
        }
        else {
          this.userMessage = res['description']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        console.log(err);
        this.toastr.showToast('danger', 'error', 'error')
      }
    );
  
}

}
