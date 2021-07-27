import { Component, OnInit ,TemplateRef, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import { MerchantTransactionHistoryService } from '../../../@core/services/merchant-transaction-history.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService, NbDialogRef ,NbDateService } from '@nebular/theme';
import { ToastrComponent } from '../../../@theme/components';
import { environment} from '../../../../environments/environment'
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import * as moment from 'moment'

@Component({
  selector: 'ngx-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {



  transaction_list:any[];

  FilterForm:FormGroup;

  view_transaction;

  view_transaction_model;

  //For pagination
      p: number = 1;
      pageSize: number = 10;
      total: number = 0;

      is_loading = false;
      userMessage;

  constructor(private transaction_service: MerchantTransactionHistoryService, private toastr: ToastrComponent,private dialogService: NbDialogService,private fb:FormBuilder,private cd: ChangeDetectorRef, private route: ActivatedRoute,private router: Router,public datepipe: DatePipe) {
  
   }

  ngOnInit() {

          this.FilterForm=this.fb.group({
      package_id:[''],
      start:[''],
      end:[''],
      status:['SUCCESS'],
      email:[''],
      phone_no:[''],
    
    })


    this.p=1
    this.pageChanged(1);
  }



pageChanged(newPage: any) {

  this.p=newPage

this.getDataWithFilters(newPage, this.pageSize,this.FilterForm.value['package_id'],this.FilterForm.value['start'],this.FilterForm.value['end'],this.FilterForm.value['status'],this.FilterForm.value['email'],this.FilterForm.value['phone_no'])
        
  }


  transactionSubmit(){

this.p=1

this.getDataWithFilters(this.p, this.pageSize,this.FilterForm.value['package_id'],this.FilterForm.value['start'],this.FilterForm.value['end'],this.FilterForm.value['status'],this.FilterForm.value['email'],this.FilterForm.value['phone_no'])


  }


  getDataWithFilters(pageNumber,limit,package_id,start,end,status,email,phone){
console.log(start)
    let condition = ''
    if (package_id) {
      condition = condition  + '&payment_id=' + package_id
    }

    if (start && end) {
      condition = condition + '&start_date=' + moment(start).format('YYYY-MM-DD HH:mm:ss') + '&end_date=' + moment(end).format('YYYY-MM-DD HH:mm:ss')
    }

    if (status) {
      condition = condition + '&status=' + status
    }

    if (email) {
      condition = condition + '&email=' + email
    }

    if (phone) {
      condition = condition + '&phone=' + phone
    }

    console.log(condition)



          this.transaction_service.getAllTransactionsByPage(pageNumber, limit,condition).then(
        res => {
          this.is_loading = false
          console.log(res)
          if (res['message']=="success") {
              this.transaction_list = res['data']['data']
            
             this.total = res['data']['limit'];
          }
          else {
              this.userMessage = res['message']
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

  openTransactionModel(dialogViewTransaction: TemplateRef<any>,transactionData){
    this.getTransactionById(dialogViewTransaction,transactionData.id);
     // this.view_transaction_model = this.dialogService.open(dialogViewTransaction,{closeOnBackdropClick:false ,hasScroll :true});

   

  }

  getTransactionById(dialogViewTransaction: TemplateRef<any>,id){

              this.transaction_service.getTransactionDataById(id).then(
        res => {
          this.is_loading = false
          console.log(res)
          if (res['message']=="success") {
              this.view_transaction = res['data']
            
       this.view_transaction_model = this.dialogService.open(dialogViewTransaction,{closeOnBackdropClick:false ,hasScroll :true});

          }
          else {
              this.userMessage = res['message']
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

  resetFields(){
    this.FilterForm.reset();
    this.FilterForm.get('status').patchValue('SUCCESS')
    this.getDataWithFilters(1, this.pageSize,this.FilterForm.value['package_id'],this.FilterForm.value['start'],this.FilterForm.value['end'],this.FilterForm.value['status'],this.FilterForm.value['email'],this.FilterForm.value['phone_no'])
    //       setTimeout(() => {
    //   this.FilterForm.setValue({
    //     status:' ',
    //   })
    // }, 0);

  }



}
