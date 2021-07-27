import { Component, OnInit, TemplateRef  } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrComponent } from '../../@theme/components';
import { TransactionHistoryService } from '../../@core/services/transaction-history.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';



@Component({
  selector: 'ngx-qr-transaction-history',
  templateUrl: './qr-transaction-history.component.html',
  styleUrls: ['./qr-transaction-history.component.scss']
})

export class QrTransactionHistoryComponent implements OnInit {
 

  
//   transform(customer_phone_no: string) {    
//     let toBeReplaced = customer_phone_no.slice(0, 7);
//     return customer_phone_no.replace(toBeReplaced, "xxx-xxx");
// }

//  maskPhoneNumber(customer_phone_no){
//     if (customer_phone_no.length != 12) {
//       return ''
//     } else {
//       return customer_phone_no.substring(0, 0) + '*******' + customer_phone_no.substring(8);
//     }
//   }

  p: number = 1;
  pageSize: number = 10;
  total: number = 0;
  search_by = 0
  search_text = ''

  p2: number = 1;
  pageSize2: number = 10;
  total2: number = 0;
  search_by2 = 0
  search_text2 = ''

  // form: FormGroup
  transaction_list: any[]
  userMessage
  date_transaction
  date
  transaction_list2: any[]
  userMessage2

  refund_details = {}
  refund_info: any[]
  is_loading = false
  onepay_transaction

  refundForm: FormGroup;

  constructor(
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private transactionHistoryService: TransactionHistoryService,
    private toastr: ToastrComponent,
    private fb: FormBuilder
  ) {

    this.refundForm = this.fb.group({
      transaction_id: ['', Validators.required],
      user_name: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  ngOnInit() {
    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }
    this.pageChanged(1);
    this.pageChanged2(1);
  }

 
  pageChanged(newPage: any) {
    this.p = newPage
    this.getTransactionData(this.p, this.pageSize);
  }
  pageChanged2(newPage: any) {
    this.p2 = newPage
    this.getTransactionData2(this.p2, this.pageSize2);
  }

  //onepay transaction 
  getTransactionData(p, pageSize) {
    this.is_loading = true
    this.transaction_list = [] = []
    if (this.search_by == 0) {
      this.transactionHistoryService.getTransactionHistoryOnepay(p, pageSize).then(
        res => {
          this.is_loading = false
          if (res['success']) {
            this.transaction_list = res['data']['Transaction']
            console.log(this.transaction_list, 'kkk')
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
    } else if (this.search_by == 1) {
      this.is_loading = true
      if (this.search_text) {
        this.transactionHistoryService.getTransactionHistoryOnepayByTransactionId(this.p, pageSize, this.search_text).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.transaction_list = res['data']['Transaction']
              console.log(this.transaction_list, 'kkk')
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
        this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
      }
    } else {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
    }
  }
  //onepay search fuction
  search_data() {
    console.log(this.search_by)
    this.getTransactionData(1, this.pageSize);

  }

  changeSearchType() {
    this.search_text = ''
    if (this.search_by == 0) {
      this.getTransactionData(1, this.pageSize)
    }
  }

  //onepay refund information
  open3(dialog3: TemplateRef<any>, transaction_list) {
    this.refund_details = transaction_list

    this.dialogService.open(
      dialog3, { closeOnBackdropClick: false }
    );
  }
  //onepay create refund
  addRefund() {
    this.is_loading = true
    this.transactionHistoryService.postRefundData(this.refundForm.value).then(res => {
      if (res['success']) {
        this.is_loading = false
        this.refundForm.reset()
        this.toastr.showToast('success', 'success', 'Refund Data Send Success')
      } else {
        this.is_loading = false
        console.log('error')
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      console.log(error)

      this.toastr.showToast('danger', 'error', 'Internal Server Error')

    })
  }

  open4(id) {
    this.refundForm.setValue({
      transaction_id: id,
      user_name: '',
      reason: ''
    })
    
  }

  // loro transaction
  search_data2() {
    console.log(this.search_by2)
    this.getTransactionData2(1, this.pageSize2);

  }

  changeSearchType2() {

    this.search_text2 = ''
    if (this.search_by2 == 0) {
      this.getTransactionData2(1, this.pageSize2)
    }
  }


  getTransactionData2(p2, pageSize2) {
    this.is_loading = true
    this.transaction_list2 = [] = []
    if (this.search_by2 == 0) {
      this.transactionHistoryService.getTransactionHistory(p2, pageSize2).then(
        res => {
          this.is_loading = false
          if (res['success']) {
            this.transaction_list2 = res['data']['Transaction']
            console.log(this.transaction_list2, 'kkk2')
            this.total2 = res['data']['count'];
          }
          else {
            this.userMessage2 = res['description']
            this.toastr.showToast('danger', 'error', this.userMessage2)
          }
        },
        err => {
          this.is_loading = false
          console.log(err);
          this.toastr.showToast('danger', 'error', 'Internal Server Error')
        }
      );
    } else if (this.search_by2 == 1) {
      this.is_loading = true
      if (this.search_text2) {
        this.transactionHistoryService.getTransactionHistoryByTransactionId(this.p2, pageSize2, this.search_text2).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.transaction_list2 = res['data']['Transaction']
              console.log(this.transaction_list2, 'kkk2')
              this.total2 = res['data']['count'];
            }
            else {
              this.userMessage2 = res['description']
              this.toastr.showToast('danger', 'error', this.userMessage2)

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
        this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
      }
    } else {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
    }
  }
  // onepay transaction view
  openOnepayView(dialogOnepayView: TemplateRef<any>, onepay) {
    this.onepay_transaction = onepay

    this.dialogService.open(
      dialogOnepayView, { closeOnBackdropClick: false });
  }




}
