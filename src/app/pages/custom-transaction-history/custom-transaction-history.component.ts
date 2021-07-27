import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../@theme/components';
import { TransactionHistoryService} from '../../@core/services/transaction-history.service'

@Component({
  selector: 'ngx-custom-transaction-history',
  templateUrl: './custom-transaction-history.component.html',
  styleUrls: ['./custom-transaction-history.component.scss']
})
export class CustomTransactionHistoryComponent implements OnInit {
  is_loading = false
  p: number = 1;
  total: number = 0;
  pageSize: number = 10;
  userMessage
  search_by = 0
  search_text

  payment_list = [] = []
  custom_payment_details
  payment_view_model

  constructor(
    private dialogService: NbDialogService,
    private transactionHistoryService: TransactionHistoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrComponent
  ) { 
    
  }
  
  ngOnInit() {
    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }
    this.pageChangedPayment(1)
  }
  pageChangedPayment(newPage: any) {
    console.log('kk')
    this.p = newPage
    this.getPaymentAllData(this.p, this.pageSize);
  }
  search_data() {
    this.getPaymentAllData(1, this.pageSize)
  }

  changeSearchType() {
    this.search_text = ''
    if (this.search_by == 0) {
      this.getPaymentAllData(1, this.pageSize)
    }
  }
  getPaymentAllData(p, pageSize) {
    this.is_loading = true
    this.payment_list = [] = []
    if (this.search_by == 0) {
      this.is_loading = false
      this.transactionHistoryService.getCustonTransactionHistory(p, pageSize).then(
        res => {
          this.is_loading = false
          if (res['success']) {
            this.payment_list = res['data']['transaction_data'];
            this.total = res['data']['count'];
          }
          else {
            this.userMessage = res['description']
            this.toastr.showToast('danger', 'error', this.userMessage)
          }
        },
        err => {
          this.is_loading = false
          console.log(err);
          this.toastr.showToast('danger', 'error', 'Internal Server Error')

        }
      );
    }
    else if (this.search_by == 1) {
      this.is_loading = true
      if (this.search_text) {
        this.transactionHistoryService.getCustonTransactionHistoryByPhoneNumber(p, pageSize, this.search_text).then(
          res => {
            console.log('ffffsdfgfgsdfgsdfgsdfgsd',this.payment_list)
            this.is_loading = false
            if (res['success']) {
              this.payment_list = res['data']['transaction_data'];
              this.total = res['data']['count'];
            }
            else {
              this.userMessage = res['description']
              this.toastr.showToast('danger', 'error', this.userMessage)
            }
          },
          err => {
            this.is_loading = false
            console.log(err);
            this.toastr.showToast('danger', 'error', 'Internal Server Error')
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Incorrect Search Keyword')
      }
    }
    else if (this.search_by == 2) {
      this.is_loading = true
      if (this.search_text) {
        this.transactionHistoryService.getCustonTransactionHistoryByRefNo(p, pageSize, this.search_text).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.payment_list = res['data']['transaction_data'];
              this.total = res['data']['count'];
            }
            else {
              this.userMessage = res['description']
              this.toastr.showToast('danger', 'error', this.userMessage)
            }
          },
          err => {
            this.is_loading = false
            console.log(err);
            this.toastr.showToast('danger', 'error', 'Internal Server Error')
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Incorrect Search Keyword')
      }
    }
    else if (this.search_by == 3) {
      this.is_loading = true
      if (this.search_text) {
        this.transactionHistoryService.getCustonTransactionHistoryByRefNoOnepay(p, pageSize, this.search_text).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.payment_list = res['data']['transaction_data'];
              this.total = res['data']['count'];
            }
            else {
              this.userMessage = res['description']
              this.toastr.showToast('danger', 'error', this.userMessage)
            }
          },
          err => {
            this.is_loading = false
            console.log(err);
            this.toastr.showToast('danger', 'error', 'Internal Server Error')
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Incorrect Search Keyword')
      }
    }
    else {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Incorrect Search Keyword')
    }
  }
  //view payment details
  openViewPayment(dialogViewPayment: TemplateRef<any>, payment) {
    this.custom_payment_details = payment

    this.payment_view_model = this.dialogService.open(dialogViewPayment, { closeOnBackdropClick: false });
  }

}
