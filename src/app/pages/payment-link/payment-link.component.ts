import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { GatewayService } from '../../@core/services/gateway.service';
import { ToastrComponent } from '../../@theme/components';
import * as moment from 'moment'
import { ClipboardService } from 'ngx-clipboard';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OWL_DATE_TIME_LOCALE_FACTORY } from 'ng-pick-datetime/date-time/adapter/date-time-adapter.class';

@Component({
  selector: 'ngx-payment-link',
  templateUrl: './payment-link.component.html',
  styleUrls: ['./payment-link.component.scss']
})
export class PaymentLinkComponent implements OnInit {
  today: Date;
  transaction_list = []
  createLinkForm : FormGroup;
  generateLinkModal: any;
  checked = false;
  applist = [];
  currentDate: string;

  refernce_filter = ""
  status_filter = ""
  is_loading 
  p: number = 1;
  total: number = 0;
  pageSize: number = 10;
  isCopied3: boolean;
  view_details: any = {}
  viewModel: any;
  isCopied2: boolean;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private clipboardService: ClipboardService,
    private dialogService: NbDialogService,
    private gatewayService: GatewayService,
    private toastr: ToastrComponent
  ) {
    this.createLinkForm = this.fb.group({
      app_id: ["0", Validators.required],
      customer_first_name: ["", Validators.required],
      customer_last_name:  ["", Validators.required],
      customer_mobile_no:  ["", [Validators.required, Validators.pattern("[1-9]{1}[0-9]{8}")]],
      customer_email:      ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9. !#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]],
      pl_description:      ["", Validators.required],
      reference_id :       ["", [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
      expire_datetime:     [""],
      amount:              ["", [Validators.required , Validators.min(1) , Validators.max(1000000), Validators.pattern("[1-9]{1}[0-9]{7}")]]
    });
  }

  ngOnInit() {
    this.getApps();
    this.pageChanged(1);
    this.today = new Date();
    this.currentDate = this.today.getFullYear().toString() + '-' 
           + ("0" + (this.today.getMonth() + 1)).slice(-2) + '-' 
           + ("0" + (this.today.getDate())).slice(-2);
           this.currentDate =  this.currentDate.replace('T','-');
           var parts =  this.currentDate.split('-');
    this.currentDate =  this.currentDate + 'T' + this.today .toTimeString().slice(0,5);
  }
  
  pageChanged(newPage){
    this.p = newPage
    this.getPaymentLinks(this.p, this.pageSize);
  }

  openInput(event){
    this.checked = event;
    console.log(this.checked)
  }

  generateLink(dialog: TemplateRef<any>) {
    this.generateLinkModal = this.dialogService.open(dialog, {
      closeOnBackdropClick: false,
    });
  }

  createPaymentLink(){
   
    let request = {
      ...this.createLinkForm.value,
      "is_partial_payments": this.checked
    }

    request["customer_mobile_no"] = "+94" + this.createLinkForm.value.customer_mobile_no;

    if (!this.checked) {
      request['expire_datetime'] = moment(this.createLinkForm.value['expire_datetime']).format("YYYY-MM-DD HH:mm:ss")
    }

    this.is_loading = true;
    this.gatewayService.createPaymentLink(request).then(res=>{
      if(res['status'] == 100) {
        this.toastr.showToast('success', 'Cheers!', "Payment link successfully created");
        this.createLinkForm.reset();
        this.generateLinkModal.close();
        this.is_loading = true;
        this.pageChanged(1);
        this.is_loading = false;
      } else {
        this.toastr.showToast('danger', 'Oh Snap!', res['message'])
      }
    })

  }

  close2(){
    this.createLinkForm.reset();
    this.generateLinkModal.close();
  }
  //copy token
  callServiceToCopy() {
    this.clipboardService.copy('This is copy thru service copyFromContent directly');
  }

  btnStatus (){
    if (!this.checked) {
      return !(this.createLinkForm.valid &&  !(this.createLinkForm.value['app_id'] == "0") && !(this.createLinkForm.value['expire_datetime'] == ""))
    } else {
      return !(this.createLinkForm.valid &&  !(this.createLinkForm.value['app_id'] == "0"))
    }
  }

  getApps() {
    this.is_loading = true;
    this.gatewayService.getApps().then(
      (res) => {
        this.is_loading = false;
        if (res && res["status"] == 100) {
          this.applist = res["data"];
          console.log(this.applist)
        } else {
          this.toastr.showToast("danger", "Oh Snap!", res["message"]);
        }
      },
      (err) => {
        this.is_loading = false;
        this.toastr.showToast(
          "danger",
          "Oh Snap!",
          "Please Check your internet connction"
        );
      }
    );
  }

  getPaymentLinks(page, limit, status="", reference="") {
    this.is_loading = true;
    let params = "page=" + page + "&limit=" + limit

    if(status) {
      params+="&status=" + status 
    }

    if(status) {
      params+="&status=" + status 
    }

    if(reference) {
      params+="&reference=" + reference 
    }

    this.gatewayService.getPaymantLinks(params).then(
      (res) => {
        console.log(res)
        this.is_loading = false;
        if (res && res["status"] == 100) {
          this.transaction_list = res["data"];
          this.total = res["count"]
        }
      });
  }

  filter_data(){
    console.log(this.status_filter, this.refernce_filter)
    this.getPaymentLinks(1,this.pageSize, this.status_filter, this.refernce_filter)
  }

  clear_data(){
    this.refernce_filter = ""
    this.status_filter = "ALL"
    this.getPaymentLinks(1,this.pageSize, "", "")
  }

  copiedSuccess(){
    this.isCopied3 = true;
    if(this.isCopied3){
      this.toastr.showToast("success", "Cheers!","Copied successfully!");
    }
  }

  new_date(){
    var today = new Date().toISOString();
    console.log(today)
    document.getElementById("txtdate")['min'] = today;
  }

  openView(dialog1: TemplateRef<any>, data) {
    this.view_details = data;
    console.log(this.view_details)
    this.viewModel = this.dialogService.open(dialog1, {
      closeOnBackdropClick: false,
    });
  }

  getServiceString(services) {
    let service_string = "";
    for (let a = 0; a < services.length; a++) {
      service_string += services[a]["ipg_provider_name"];
      if(a != services.length-1) {
        service_string += '/ '
      }
    }
    return service_string;
  }
  
  closeView() {
    this.viewModel.close();
  }
  
  successCopied(){
    this.isCopied2 = true;
    if(this.isCopied2){
      this.toastr.showToast("success", "Cheers!","Copied successfully!");
    }
  }
  
  onCopyFailure() {
    this.toastr.showToast("danger", "Oh Snap!", "Cannot copy!");
  }

  // omit_special_char(event) // THIS IS AN FUNCTION TO OMIT WORDS NOT IN ENGLISH
  // {   
  //   var k;  
  //   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
  //   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  // }

  inputValidator(event: any){
    // var k;  
    // k = event.keyCode; 
    // return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
  
}
