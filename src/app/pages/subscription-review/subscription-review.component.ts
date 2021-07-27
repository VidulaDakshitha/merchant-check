import { Component, OnInit,TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { ToastrComponent } from '../../@theme/components'
import {EncriptionService} from '../../@core/services/encription.service'
@Component({
  selector: 'ngx-subscription-review',
  templateUrl: './subscription-review.component.html',
  styleUrls: ['./subscription-review.component.scss']
})
export class SubscriptionReviewComponent implements OnInit {
  public user_data = this.EncriptionService.response_decript(localStorage.getItem("opm_user"))
  package_payment_model
  userMessage
  is_loading = false
  subscription_package = []
  subscription_package_details = []
ipg_charge=""
  showSubscription=false;
  is_pay_disabled=false

  constructor(
    private dialogService: NbDialogService,
    private userService: UserService,
    private toastr: ToastrComponent,
    private EncriptionService:EncriptionService
  ) { }

  ngOnInit() {
    this.getPackageSubscriptionStatus()
    this.getSubscriptionPackageData()
       this.getPackageSubscriptionDetails()
  }




  getPackageSubscriptionDetails(){
        this.userService.getSubscriptionPackageDetails().then(
      res => {
        this.is_loading = false
        console.log(res, 'vidula')
        if (res['message'] == "success") {
          

          this.subscription_package_details = res['data'];
              console.log(res)
          console.log(this.subscription_package_details, 'SubscriptionPackageData')
  
        }else{

        this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }


    getPackageSubscriptionStatus(){
        this.userService.getSubscriptionPackageStatus().then(
      res => {
        this.is_loading = false
        console.log(res, 'vidula')
        if (res['message'] == "success") {
          if(res['data'])
          {
            this.is_pay_disabled=true
          }else{
             this.is_pay_disabled=false
          }
  
        }else{

        this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }

  // Request document 
  openPackagePayment(dialogPackagePayment: TemplateRef<any>) {
    this.package_payment_model = this.dialogService.open(dialogPackagePayment, { closeOnBackdropClick: false });
  }


  submitPayment() {
    let data ={
      "user_id":this.user_data.user_id
    }
    this.is_loading = true
    console.log(data,'sssss')
    this.userService.postPackagePaymentData(data).then(res => {
      console.log(res,'tt')
      if (res['status'] == 100) {
        console.log(res)
        this.is_loading = false
        location.href=res['redirect_url']
        this.toastr.showToast('success', 'success', 'Data Sent Success')
        this.package_payment_model.close()
      location.href=res['redirect_url']
      } else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)

      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }



  // subscription package
  getSubscriptionPackageData() {
    this.userService.getSubscriptionPackage().then(
      res => {
        this.is_loading = false
        if (res['status'] == 100) {
          
          this.subscription_package = res['data'];
          console.log(this.subscription_package, 'SubscriptionPackageData')
         this.showSubscription=true

          if(this.subscription_package['package_name']=="Standard"){
            this.ipg_charge="(Payment processing fee is 3.60%)"
          }else if(this.subscription_package['package_name']=="Essential"){
            this.ipg_charge="(Payment processing fee is 3.25%)"
          }else if(this.subscription_package['package_name']=="Elevate"){
            this.ipg_charge="(Payment processing fee is 2.75%)"
          }else if(this.subscription_package['package_name']=="Premier"){
            this.ipg_charge="(Payment processing fee is 2.5%)"
          }else{
            this.ipg_charge=""
          }
        }
        else if(res['status'] == 125){
            this.showSubscription=false
        }else{
                 this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }

}
