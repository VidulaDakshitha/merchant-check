import { Component, OnInit, AfterViewInit , TemplateRef} from '@angular/core';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { QrGenerateService } from '../../@core/services/qr-generate.service'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { TransactionHistoryService } from '../../@core/services/transaction-history.service';
import { DomEvent } from 'leaflet';
import { ToastrComponent } from '../../@theme/components';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-qr-generate',
  templateUrl: './qr-generate.component.html',
  styleUrls: ['./qr-generate.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class QrGenerateComponent implements OnInit, AfterViewInit  {
  qr_form: FormGroup;
  qr_code = ''
  is_loading = false;
  error_msg = ''
  p: number = 1;
  pageSize: number = 6;
  transaction_list:any[]
  userMessage

  qr_model
  constructor(
    private transactionHistoryService: TransactionHistoryService,
    private qrGenerateService: QrGenerateService,
    private fb: FormBuilder,
    private toastr: ToastrComponent,
    private dialogService: NbDialogService
  ) {
    this.qr_form = this.fb.group({
      amount: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getTransactionHistoryOnepay()
    this.focusInput()
  }

  ngAfterViewInit() {
    this.focusInput()
  }

  getQR(dialog) {
    this.is_loading = true;
    this.qr_code = ''
    this.error_msg = ''
    if (this.qr_form.invalid) {
      this.is_loading = false;
      this.error_msg = 'Can not generete QR code!'
      return;
    }

    // let request = {
    //   amount: this.qr_form.value['amount'].toString()
   
      
    // }
    let data =this.qr_form.value
    //data['amount']= this.to_float(data['amount'])

    this.qrGenerateService.addGenerateQrcode(data).then(res => {
      this.is_loading = false;
      if (res['success']) {
        this.transactionHistoryService.getTransactionHistoryOnepay(this.p,this.pageSize)
        this.qr_code = res['data']
        this.error_msg = ''
        this.openDialog(dialog)
        setTimeout(() => {   
          let canvasElement = document.querySelectorAll(".qrcode canvas")[0] as HTMLCanvasElement
        canvasElement.setAttribute("style", "height:300px; width:300px;")
        }, 300);

      } else {
        this.error_msg = res['description']
        this.qr_code = ''
      }
    })
  }


  download() {
    let canvasElement = document.querySelectorAll(".qrcode canvas")[0] as HTMLCanvasElement
    var MIME_TYPE = "image/png";
    var imgURL = canvasElement.toDataURL(MIME_TYPE);
    var dlLink = document.createElement('a');
    dlLink.download = 'onepay qr';
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
  }



  focusInput() {
    let el = document.getElementById('search_input')
    setTimeout(() => {   
      el.focus()
    }, 300);
  }

  onResize(event){
    let self = this;
    setTimeout(() => {   
      self.focusInput()
    }, 300);
    
  }

  search_qr(){
    this.qr_form.reset()
    this.qr_code = ''
    this.qr_model.close()
  }

  getTransactionHistoryOnepay() {
    this.transactionHistoryService.getTransactionHistoryOnepay(this.p,this.pageSize).then(res=>{
      if (res['success']) {
        this.transaction_list = res['data']['Transaction']
        console.log(this.transaction_list, 'tttttt')
      }
      else {
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    },
    err => {
      console.log(err);
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    }
    
    )
  }
  // amount
  to_float(value) {
    let num = parseFloat(value)
    return num.toFixed(2);
  }

  openDialog(dialogReturned: TemplateRef<any>){
    

    console.log(this.qr_form.value['amount'])
     setTimeout(() => {
    this.qr_code=this.qr_form.value['amount']
      }, 1000);
      this.qr_model = this.dialogService.open(dialogReturned,{closeOnBackdropClick:false ,hasScroll :true});
  }

  closeReturned() {
    this.qr_model.close()
  }
  



}
