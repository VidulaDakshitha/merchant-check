import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ChequeManageService} from '../../@core/services/cheque-manage.service';
import { UserService } from '../../@core/services/user.service';
import { ToastrComponent } from '../../@theme/components';

@Component({
  selector: 'ngx-issue-cheque',
  templateUrl: './issue-cheque.component.html',
  styleUrls: ['./issue-cheque.component.scss']
})
export class IssueChequeComponent implements OnInit {
  p: number = 1;
    total: number = 0;
    pageSize: number = 10;
    userMessage
    search_by = 0
    search_text
    issue_cheque_list = [] = []
    update_issue_cheque_model

  issueChequeForm: FormGroup;
  issueChequeFormUpdate: FormGroup;
  is_loading = false
  addIssue_cheque_model
  bank_list = []
  cheque_id_by_bank  = []
  cheque_id
  bank_id :any

  constructor(
    private dialogService: NbDialogService, private fb: FormBuilder,
    private chequeManageService: ChequeManageService,
    private router: Router,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private userService: UserService,
    private change: ChangeDetectorRef,
    private toastr: ToastrComponent
  ) { 

    this.issueChequeForm = this.fb.group({
      cheque_id: ['',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]],
      bank_id:['', Validators.required],
      description: ['', Validators.required],
      matured_date: ['', Validators.required],
      chequebook_id: ['',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]],
      amount: ['', Validators.required],
    });
    this.issueChequeFormUpdate = this.fb.group({
      id: ['', Validators.required],
      cheque_id: ['',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]],
      // bank_id:['', Validators.required],
      description: ['', Validators.required],
      matured_date: ['', Validators.required],
      chequebook_id: ['',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]],
      amount: ['', Validators.required],
    });
  }

  ngOnInit() {
   
    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }
    this.pageChangedIssueCheque(1)
  
  }
  
  pageChangedIssueCheque(newPage: any) {
    console.log('kk')
    this.p = newPage
    this.getIssueChequeAllData(this.p, this.pageSize);
  }
  search_data() {
    this.getIssueChequeAllData(1, this.pageSize)
}

changeSearchType() {
  this.search_text = ''
  if (this.search_by == 0) {
    this.getIssueChequeAllData(1, this.pageSize)
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




  //add issue cheque
  openIssueCheque(dialogIssueCheque: TemplateRef<any>) {
    this.addIssue_cheque_model = this.dialogService.open(dialogIssueCheque);
  }
  closeIssueCheque() {
    this.issueChequeForm.reset()
    this.addIssue_cheque_model.close()
  }

  addIssueChequeData() {
    this.is_loading = true
    let formatted_data = this.issueChequeForm.value
    formatted_data.matured_date = this.formatDate(formatted_data.matured_date)
    console.log(formatted_data)
    this.chequeManageService.postIssueCheque(formatted_data).then(res => {
      this.is_loading = false
      if (res['success']) {
        this.getIssueChequeAllData(this.p, this.pageSize)
        this.addIssue_cheque_model.close()
        this.issueChequeForm.reset()
        this.toastr.showToast('success', 'success','Issue Cheque Success')
      } else {
        console.log('error')
        this.toastr.showToast('danger', 'error', 'error')
      }
    }, error => {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'error')
      console.log(error)
    })
  }

//get cheque book by bank ID

//get bank

// select bank and get cheque book id
getChequeId(id: any) {
  console.log('event',id);
  
  this.chequeManageService.getCheqeIdByBank(id).then(res=>{
    if (res['success']) {
      this.issueChequeForm.controls.cheque_id.setValue(res['data'].cheque_id);
      this.issueChequeForm.controls.chequebook_id.setValue(res['data'].chequebookid);
      this.issueChequeForm.controls['cheque_id']
      this.issueChequeForm.controls['chequebookid']
      // this.issueChequeForm.controls['cheque_id'].disable();
    }
    else {
      this.userMessage = res['description']
      this.toastr.showToast('danger', 'error', this.userMessage)
    }
  },
  err => {
    console.log(err);
    this.toastr.showToast('danger', 'error', 'error')
  }
  
  )
}
//get issue cheque
getIssueChequeAllData(p, pageSize) {
  this.is_loading = true
  console.log('chequeALL')
  this.issue_cheque_list = [] = []
  if (this.search_by == 0) {
    this.is_loading = false
    this.chequeManageService.getIssueChequeData(p, pageSize).then(
      res => {
        this.is_loading = false
        if (res['success']) {
          this.issue_cheque_list = res['data']['transaction_data'];
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
        this.toastr.showToast('danger', 'error', 'error')
      }
    );
  } 
  else if (this.search_by == 1) {
    this.is_loading = true
    if (this.search_text) {
      this.chequeManageService.getIssueChequeDataByChequeId(p, pageSize,this.search_text).then(
        res => {
          this.is_loading = false
          if (res['success']) {
            this.issue_cheque_list = res['data']['transaction_data'];
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
          this.toastr.showToast('danger', 'error', 'error')
        }
      );
    } else {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
    }
  }
  else {
    this.is_loading = false
    this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
  }
}
//issue Cheque View popup
openIssueChequeView(dialogIssueChequeView: TemplateRef<any>, issue_cheque) {
  this.issue_cheque_list = issue_cheque
    console.log(this.issue_cheque_list)

  this.dialogService.open(
    dialogIssueChequeView);
}

// update issue cheque
openIssueChequeUpdate(dialogIssueChequeUpdate: TemplateRef<any>, issue_cheque) {
  setTimeout(() => { 
    this.issueChequeFormUpdate.setValue({
      id: issue_cheque.id,
      amount: issue_cheque.amount,
      chequebook_id: issue_cheque.chequebook_id,
      cheque_id: issue_cheque.cheque_id,
      matured_date: issue_cheque.matured_date,
      description: issue_cheque.description,
    
  });
   }, 0);

  this.update_issue_cheque_model = this.dialogService.open(dialogIssueChequeUpdate);
}

closeIssueChequeUpdate() {
  this.issueChequeFormUpdate.reset()
  this.update_issue_cheque_model.close()
}

updateIssueData() {
  this.is_loading = true
  let formatted_data = this.issueChequeFormUpdate.value
  formatted_data.matured_date = this.formatDate(formatted_data.matured_date)

  this.chequeManageService.updateIssueChequeData(formatted_data).then(res => {
    this.is_loading = false
    if (res['success']) {
      this.getIssueChequeAllData(this.p, this.pageSize)
      this.update_issue_cheque_model.close()
      this.issueChequeFormUpdate.reset()
      this.toastr.showToast('success', 'success','Cheque Updated Success')
    } else {
      this.toastr.showToast('danger', 'error', 'error')
    }
  }, error => {
    this.is_loading = false
    console.log(error)
    this.toastr.showToast('danger', 'error', 'error')
  })
}

}
