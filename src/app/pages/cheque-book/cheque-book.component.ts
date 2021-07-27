import { Component, OnInit,TemplateRef } from '@angular/core';
import { ChequeManageService} from '../../@core/services/cheque-manage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrComponent } from '../../@theme/components';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { from } from 'rxjs';


@Component({
  selector: 'ngx-cheque-book',
  templateUrl: './cheque-book.component.html',
  styleUrls: ['./cheque-book.component.scss']
})
export class ChequeBookComponent implements OnInit {

  is_loading = false
  bank_list = []
  addChequeBookForm: FormGroup;

  p: number = 1;
  pageSize: number = 10;
  total: number = 0;
  search_by = 0
  search_text = ''
  cheque_book_list: any[]
  userMessage

  constructor(
    private dialogService: NbDialogService,
     private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private chequeManageService: ChequeManageService,
    private toastr: ToastrComponent,
    private userService: UserService
  ) { 
    this.addChequeBookForm = this.fb.group({
      first_cheque_no: ['',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]],
      last_cheque_no: ['',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]],
      bank_id: ['', Validators.required],

    });

  }

  ngOnInit() {

    this.pageChanged(1);
  }
  pageChanged(newPage: any) {
    this.p = newPage
    this.getChequeBookData(this.p, this.pageSize);
  }
  //cheque book search fuction
  search_data() {
   
    console.log(this.search_by)
    this.getChequeBookData(1, this.pageSize);
    
  }

  changeSearchType() {
    this.search_text = ''
    if (this.search_by == 0) {
      this.getChequeBookData(1, this.pageSize)
    }
  }
  //get bank

  //add cheque book
  addChequeBookData() {
    this.is_loading = true
    this.chequeManageService.postChequeBook(this.addChequeBookForm.value).then(res => {
      this.is_loading = false
      if (res['success']) {
        this.addChequeBookForm.reset()
        this.toastr.showToast('success', 'success','Cheque Book Add Success')
      } else {
        this.toastr.showToast('danger', 'error', 'error')
      }
    }, error => {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'error')
    })
  }
  //cheque book view
  getChequeBookData(p, pageSize) {
    this.cheque_book_list = [] = []
    if (this.search_by == 0) {
      this.is_loading = true
      this.chequeManageService.getAllChequeBook(p, pageSize).then(
        res => {
          this.is_loading = false
          if (res['success']) {
            this.cheque_book_list = res['data']['cheque_book']
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
          this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
        }
      );
    } else if (this.search_by == 1) {
      this.is_loading = true
      if (this.search_text) {
        this.chequeManageService.getAllChequeBookById(this.p, pageSize, this.search_text).then(
          res => {
            this.is_loading = false
            console.log(res)
            if (res['success']) {
              this.cheque_book_list = res['data']['cheque_book']
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
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
      }
    } else {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
    }
  }

}
