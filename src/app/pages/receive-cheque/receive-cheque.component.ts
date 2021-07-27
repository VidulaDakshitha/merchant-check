import { Component, OnInit,TemplateRef} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
// import { ManualTransactionService } from '../../@core/services/manual-transaction.service';
import { ChequeManageService } from '../../@core/services/cheque-manage.service'
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrComponent } from '../../@theme/components';
@Component({
  selector: 'ngx-receive-cheque',
  templateUrl: './receive-cheque.component.html',
  styleUrls: ['./receive-cheque.component.scss']
})
export class ReceiveChequeComponent implements OnInit {
    p: number = 1;
    total: number = 0;
    pageSize: number = 10;
    userMessage
    search_by = 0
    start
    end 
    selected_transaction = {}
    is_returned = false
   
    bank_list = []
    receive_cheque_list = [] = []
    manualForm: FormGroup;
    chequeForm: FormGroup;
    chequeFormUpdate: FormGroup;
    chequeFormReturned: FormGroup;
    date_range;
    show_dialog = false
    update_model
    addCheque_model
    is_loading = false
    search_text
    end_date
    start_date
    update_receive_cheque_model
    return_receive_cheque_model
  

  constructor(
    private dialogService: NbDialogService, private userService: UserService, private fb: FormBuilder,
    private chequeManageService: ChequeManageService,
    private router: Router,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private toastr: ToastrComponent
  ) {
    this.chequeForm = this.fb.group({
      cheque_id: ['',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]],
      amount: ['', Validators.required],
      matured_date: ['', Validators.required],
      received_date: ['', Validators.required],
      description: ['', Validators.required],
      bank_id: ['', Validators.required]
    });

    this.chequeFormUpdate = this.fb.group({
      id: ['', Validators.required],
      cheque_id: ['',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]],
      amount: ['', Validators.required],
      matured_date: ['', Validators.required],
      received_date: ['', Validators.required],
      description: ['', Validators.required],
      bank_id: ['', Validators.required],
    });
    this.chequeFormReturned = this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
     
    });
   }

  ngOnInit() {
    // this.getBank()

    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }

    this.pageChangedManual(1)
    
  }
  pageChangedManual(newPage: any) {
    this.p = newPage
    this.getChequeAllData(this.p, this.pageSize);
  }
  //cheque details view
  open3(dialog3: TemplateRef<any>, transaction) {
    this.selected_transaction = transaction
    console.log(this.selected_transaction)
    this.dialogService.open(
      dialog3);
  }
  //get bank
  // getBank() {
  //   console.log('bankkkk',this.bank_list)
  //   this.is_loading = true
  //   this.userService.getBank().then(res => {
  //     this.is_loading = false
  //     if (res['success']) {
  //       this.bank_list = res['data']
  //     }else {
  //       this.userMessage = res['description']
  //     }

  //   })
  // }
  //manual transaction search start
  getChequeAllData(p, pageSize, start=null, end=null) {
    this.is_loading = true
    console.log('chequeALL')
    this.receive_cheque_list = [] = []
    if (this.search_by == 0) {
      this.is_loading = false
      this.chequeManageService.getReceiveChequeData(p, pageSize,this.is_returned).then(
        res => {
          this.is_loading = false
          if (res['success']) {
            this.receive_cheque_list = res['data']['deposit_cheque'];
            this.total = res['data']['count'];
          }
          else {
            this.userMessage = res['description']
            this.toastr.showToast('danger', 'error',this.userMessage)
          }
        },
        err => {
          this.is_loading = false
          console.log(err);
          this.toastr.showToast('danger', 'error','error')
        }
      );
    } 
    else if (this.search_by == 1) {
      this.is_loading = true
      if (this.search_text) {
        this.chequeManageService.getReceiveChequeDataByChequeId(p, pageSize,this.search_text,this.is_returned).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.receive_cheque_list = res['data']['deposit_cheque'];
              this.total = res['data']['count'];
            }
            else {
              this.userMessage= res['description']
              this.toastr.showToast('danger', 'error',this.userMessage)
            }
          },
          err => {
            this.is_loading = false
            console.log(err);
            this.toastr.showToast('danger', 'error','error')
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error','error')
      }
    }
    else if (this.search_by == 2) {
      this.is_loading = true
      if (this.search_by) {
        let start = this.formatDate(this.date_range['start'])
        let end
        if (this.date_range['end']) {
          end = this.formatDate(this.date_range['end'])
        } else {
          end = this.formatDate(this.date_range['start'])
        }

        this.chequeManageService.getReceiveChequeDataByDate(this.p, this.pageSize, start, end,this.is_returned).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.receive_cheque_list = res['data']['deposit_cheque'];
              this.total = res['data']['count'];
            }
            else {

              this.userMessage = res['description']
              this.toastr.showToast('danger', 'error',this.userMessage)
            }
          },
          err => {
            this.is_loading = false
            console.log(err);
            this.toastr.showToast('danger', 'error','error')
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error','Incorrect search keyword')
      }
    }
    else {
      this.is_loading = false
      this.toastr.showToast('danger', 'error','Incorrect search keyword')
    }
  }
  search_data() {
      this.getChequeAllData(1, this.pageSize)
  }

  changeSearchType() {
    this.search_text = ''
    if (this.search_by == 0) {
      this.getChequeAllData(1, this.pageSize)
    }
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

  //update cheque
  open4(dialog4: TemplateRef<any>, transaction) {
    // transaction.is_returned = transaction.is_returned ? '1' : '0'
    // transaction.is_issued = transaction.is_issued ? '1' : '0'

    setTimeout(() => { 
      this.chequeFormUpdate.setValue({
        id: transaction.id,
        cheque_id: transaction.cheque_id,
        amount: transaction.amount,
        matured_date: transaction.matured_date,
        received_date: transaction.received_date,
        description: transaction.description,
        bank_id: transaction.bank_id, 
    });
     }, 0);

    this.update_receive_cheque_model = this.dialogService.open(dialog4);
  }

  close4() {
    this.chequeFormUpdate.reset()
    this.update_receive_cheque_model.close()
  }

  updateData() {
    this.is_loading = true
    let formatted_data = this.chequeFormUpdate.value
    formatted_data.matured_date = this.formatDate(formatted_data.matured_date)
    formatted_data.received_date = this.formatDate(formatted_data.received_date)

    this.chequeManageService.updateReceiveChequeData(formatted_data).then(res => {
      this.is_loading = false
      if (res['success']) {
        this.getChequeAllData(this.p, this.pageSize)
        this.update_receive_cheque_model.close()
        this.chequeFormUpdate.reset()
        this.toastr.showToast('success', 'success','Cheque Updated Success')
      } else {
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error',this.userMessage)
        
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'error')
    })
  }
  //update cheque end

  //Add cheque deposit start

  open2(dialog: TemplateRef<any>) {
    this.addCheque_model = this.dialogService.open(dialog);
  }
  close() {
    this.chequeForm.reset()
    this.addCheque_model.close()
  }

  addChequeData() {
    this.is_loading = true
    let formatted_data = this.chequeForm.value
    formatted_data.matured_date = this.formatDate(formatted_data.matured_date)
    formatted_data.received_date = this.formatDate(formatted_data.received_date)
    console.log(formatted_data)
    this.chequeManageService.postReceiveChequeData(formatted_data).then(res => {
      // this.getChequeAllData(1, this.pageSize)
      this.is_loading = false
      if (res['success']) {
        this.getChequeAllData(this.p, this.pageSize)
        this.addCheque_model.close()
        this.chequeForm.reset()
        this.toastr.showToast('success', 'success','Cheque Add Success')
      } else {
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'error')
    })
  }
  //add cheque end

  // receive cheque return

  openReturned(dialogReturned: TemplateRef<any>, transaction) {
    // transaction.is_returned = transaction.is_returned ? '1' : '0'

    setTimeout(() => { 
      this.chequeFormReturned.setValue({
        id: transaction.id,
        description: transaction.description,
    });
     }, 0);
    
    this.return_receive_cheque_model = this.dialogService.open(dialogReturned);
  }

  closeReturned() {
    this.chequeFormReturned.reset()
    this.return_receive_cheque_model.close()
  }

  returnedReceiveData() {
    this.is_loading = true

    this.chequeManageService.updateReceiveChequeReturnData(this.chequeFormReturned.value).then(res => {
      this.is_loading = false
      if (res['success']) {
        this.getChequeAllData(this.p, this.pageSize)
        this.return_receive_cheque_model.close()
        this.chequeFormReturned.reset()
        this.toastr.showToast('success', 'success','Cheque Return Success')
      } else {
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'error')
    })
  }
}
