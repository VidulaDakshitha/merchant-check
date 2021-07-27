import { Component, OnInit, TemplateRef, AfterViewInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ManualTransactionService } from '../../@core/services/manual-transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrComponent } from '../../@theme/components';

import { TransactionHistoryService } from '../../@core/services/transaction-history.service'


@Component({
  selector: 'ngx-sales-manager',
  templateUrl: './sales-manager.component.html',
  styleUrls: ['./sales-manager.component.scss'],
  // host: {
  //   '(window:resize)': 'onResize($event)'
  // }

})
export class SalesManagerComponent implements OnInit {
  p2: number = 1;
  total2: number = 0;
  pageSize2: number = 10;
  search_by_manual = 0;
  search_text2 = ''
  userMessage2

  // form: FormGroup
  transaction_list: any[]
  transaction_manual_list: any[]
  userMessage
  date_transaction
  date
  start
  end
  date_range
  is_loading = false
  manualForm: FormGroup;
  updateManualTransactionForm: FormGroup;
  deleteManualTransactionForm: FormGroup;
  update_manual_transaction_model
  delete_manual_transaction_model



  constructor(private dialogService: NbDialogService, private userService: UserService, private fb: FormBuilder,
    private manualTransactionService: ManualTransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private transactionHistoryService: TransactionHistoryService,
    private toastr: ToastrComponent
  ) {
    this.manualForm = this.fb.group({
      cash_amount: [''],
      cheque_amount: [''],
      card_amount: [''],
      updated_on: ['', Validators.required],

    });
    this.updateManualTransactionForm = this.fb.group({
      id: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.deleteManualTransactionForm = this.fb.group({
      id: ['', Validators.required],
    });

  }

  ngOnInit() {
    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }
    this.pageChangedManual(1)
    
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


  //manual transaction add start
  addManualData() {
    this.is_loading = true
    let formatted_data = this.manualForm.value
    formatted_data.updated_on = this.formatDate(formatted_data.updated_on)
    formatted_data.cheque_amount = this.manualForm.value.cheque_amount ? this.manualForm.value.cheque_amount:0.00 
    formatted_data.card_amount = this.manualForm.value.card_amount ? this.manualForm.value.card_amount:0.00 
    formatted_data.cash_amount = this.manualForm.value.cash_amount ? this.manualForm.value.cash_amount:0.00 
    this.manualTransactionService.postManualTransactionData(formatted_data).then(res => {
      this.is_loading = false
      if (res['success']) {
        this.getTransactionDataManual(this.p2, this.pageSize2)
        this.manualForm.reset()
        this.toastr.showToast('success', 'success', 'Add Manual Transaction Success')
      } else {
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }
  //add manualtransaction end

  //Manual Transaction History start
  pageChangedManual(newPage: any) {
    this.p2 = newPage
    this.getTransactionDataManual(this.p2, this.pageSize2);
  }
  //manual search fuction
  search_data_manual() {
    this.is_loading = true
    if (this.date_range) {
      this.is_loading = false
      let start = this.formatDate(this.date_range['start'])
      let end
      if (this.date_range['end']) {
        end = this.formatDate(this.date_range['end'])
      } else {
        end = this.formatDate(this.date_range['start'])
      }
      this.getTransactionDataManual(1, this.pageSize2, start, end)
    } else {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
    }

  }

  changeSearchType_manual() {
    this.date_range = ''
    if (this.search_by_manual == 0) {
      this.getTransactionDataManual(1, this.pageSize2)
    }
  }

  //manual transaction
  getTransactionDataManual(p2, pageSize2, start_date = "", end_date = "") {
    this.transaction_manual_list = [] = []
    if (this.search_by_manual == 0) {
      this.is_loading = true
      this.transactionHistoryService.getManualTransactionHistory(p2, pageSize2).then(
        res => {
          this.is_loading = false
          if (res['success']) {
            this.transaction_manual_list = res['data']['manual_transactions'];
            this.total2 = res['data']['count'];
            console.log('kkkk', this.transaction_manual_list)
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
    } else if (this.search_by_manual == 1) {
      this.is_loading = true
      if (this.date_range) {
        this.transactionHistoryService.getManualTransactionHistoryByTransactionDate(p2, pageSize2, start_date, end_date).then(
          res => {
            this.is_loading = true
            if (res['success']) {
              this.transaction_manual_list = res['data']['manual_transactions'];
              this.total2 = res['data']['count'];
            }
            else {
              this.userMessage2 = res['description']
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

  test() {
    this.toastr.showToast('primary', 'test', 'kdslkdlskd')
  }
 //Update manual transaction
 openUpdateManualTransaction(dialogUpdateManualTransaction: TemplateRef<any>, transaction_manual) {
  setTimeout(() => {
    this.updateManualTransactionForm.setValue({
      id: transaction_manual.id,
      amount: transaction_manual.amount,
    });
  }, 0);
  this.update_manual_transaction_model = this.dialogService.open(dialogUpdateManualTransaction,{closeOnBackdropClick:false });
}

updateManualTransaction() {
  this.is_loading = true
  this.transactionHistoryService.updateManualTransactionData(this.updateManualTransactionForm.value).then(res => {
    this.is_loading = false
    if (res['success']) {
      this.getTransactionDataManual(this.p2, this.pageSize2)
      this.update_manual_transaction_model.close()
      this.updateManualTransactionForm.reset()
      this.toastr.showToast('success', 'success', 'Manual Transaction Update Success')
    } else {

      this.userMessage = res['description']
      this.toastr.showToast('danger', 'error', this.userMessage)
    }
  }, error => {
    this.is_loading = false

    this.toastr.showToast('danger', 'error', 'Internal Server Error')
  })
}
// delete manual transaction
openDeleteManualTransaction(dialogDeleteCollectionType: TemplateRef<any>, transaction_manual) {
  this.deleteManualTransactionForm.setValue({
    id: transaction_manual.id,

  });
  this.delete_manual_transaction_model = this.dialogService.open(dialogDeleteCollectionType,{closeOnBackdropClick:false });
}

deleteManualTransaction() {
  this.is_loading = true
  this.transactionHistoryService.deleteManualTransaction(this.deleteManualTransactionForm.value.id).then(res => {
    this.is_loading = false
    if (res['success']) {
      this.getTransactionDataManual(this.p2, this.pageSize2)
      this.toastr.showToast('success', 'success', 'Manual Transaction Delete Success')
      this.delete_manual_transaction_model.close()
      this.deleteManualTransactionForm.reset()
    } else {
      this.userMessage = res['description']
      this.toastr.showToast('danger', 'error', this.userMessage)
    }
  }, error => {
    this.is_loading = false

    this.toastr.showToast('danger', 'error', 'Internal Server Error')
  })
}


}
