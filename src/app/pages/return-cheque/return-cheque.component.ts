
import { Component, OnInit,TemplateRef} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ChequeManageService } from '../../@core/services/cheque-manage.service'
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrComponent } from '../../@theme/components';
@Component({
     selector: 'ngx-return-cheque',
     templateUrl: './return-cheque.component.html',
     styleUrls: ['./return-cheque.component.scss']
 
})
export class ReturnChequeComponent implements OnInit {
    p: number = 1;
    total: number = 0;
    pageSize: number = 10;
    userMessage
    search_by = 0
    start
    end 
    selected_transaction = {}
    is_returned = true
   
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
    this.chequeFormUpdate = this.fb.group({
      id: ['', Validators.required],
      cheque_id: ['', Validators.required],
      amount: ['', Validators.required],
      matured_date: ['', Validators.required],
      received_date: ['', Validators.required],
      description: ['', Validators.required],
      bank_id: ['', Validators.required],
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
  pageChangedManual(newPage: any) {
    console.log('kk')
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
  //manual transaction search start
  getChequeAllData(p, pageSize, start=null, end=null) {
    console.log('this.start_date',start);
    
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    console.log(dte.toString());

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
            this.toastr.showToast('danger', 'error', this.userMessage)
          }
        },
        err => {
          this.is_loading = false
          this.toastr.showToast('danger', 'error', 'error')
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
              this.toastr.showToast('danger', 'error', this.userMessage)
            }
          },
          err => {
            this.is_loading = false
            console.log(err);
            // this.toastr.error('Error!');
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'error')
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

  
}

