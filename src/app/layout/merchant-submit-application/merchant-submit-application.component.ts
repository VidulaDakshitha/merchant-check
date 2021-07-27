import { Component, OnInit } from '@angular/core';
import {UserService} from '../../@core/services/user.service'
import { ToastrComponent } from '../../@theme/components'

@Component({
  selector: 'ngx-merchant-submit-application',
  templateUrl: './merchant-submit-application.component.html',
  styleUrls: ['./merchant-submit-application.component.scss']
})
export class MerchantSubmitApplicationComponent implements OnInit {

  is_loading = false
  pdf_merchant
  userMessage
  files
  uploadFile
  coupon_list
  purchase_list


  constructor(
    private userService: UserService,
    private toastr: ToastrComponent,
  ) { }

  ngOnInit() {
  }

  manualPDFData() {
    console.log('44444')
    this.is_loading = true
    this.userService.getMerchantFullViewnew().then(res => {
      console.log(res)
      if (res['success']) {
        
        this.pdf_merchant = res['data']['merchant_data'];
        console.log(this.pdf_merchant,'888888')
         
      } else {
        this.is_loading = false
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }

}
