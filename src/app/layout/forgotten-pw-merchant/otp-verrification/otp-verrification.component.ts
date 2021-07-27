import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../@core/services/user.service';
import {ActivatedRoute, Router} from '@angular/router'
@Component({
  selector: 'ngx-otp-verrification',
  templateUrl: './otp-verrification.component.html',
  styleUrls: ['./otp-verrification.component.scss']
})
export class OtpVerrificationComponent implements OnInit {
  otp_verification_from: FormGroup
  serverErrorMessages: string;
  message = ""
  is_alert = false
  is_alert_succes = false
  is_loading = false
  yyy = [] 
  email_data
  userMessage


  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
    
  ) { 
    this.otp_verification_from = fb.group({
      phone_number: [''],
      otp: ['', Validators.required]
    });

    console.log(this.route.snapshot)

    if (this.route.snapshot.queryParams && this.route.snapshot.queryParams['phone_no']) {
      console.log('email',route.snapshot.queryParams.email)
      this.otp_verification_from.setValue({
        phone_number:this.route.snapshot.queryParams['phone_no'],
        otp: ''
      })
    } else {
      console.log('kkllll')
   this.router.navigate(['/reset-password'])
    }
    
  }

  

  ngOnInit() {
    this.getEmail()
  }
  getVerification() {
    this.is_loading = true
    if (!this.otp_verification_from.valid) {
      this.is_loading = false
      this.showAlert('Please provide required data')
      return
    }
    this.userService.postPwResetOtpData(this.otp_verification_from.value).then(res => {
      console.log(res)
      if (res['status'] == 100) {
        this.is_loading = false
        this.router.navigate(['/reset-confirm-password'], { queryParams: { phone_no: this.otp_verification_from.value['phone_number'] } })
        this.otp_verification_from.reset()
        this.showAlertSucces('Data send Success')
      } else {
        this.is_loading = false
        // console.log('error')
        this.showAlert(res['message'])
       
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.showAlert('Internal Server error')
    })
  }
  showAlert(message) {
    this.is_alert = true
    this.message = message
    setTimeout(() => {    
      this.is_alert = false
    }, 2000);
  }
  showAlertSucces(message) {
    this.is_alert_succes = true
    this.message = message
    setTimeout(() => {    
      this.is_alert_succes = false
    }, 2000);
  }
// get email
getEmail() {
  this.is_loading = true
  this.userService.getOtp(this.route.snapshot.queryParams['phone_no']).then(res => {
    if (res['status'] == 100) {
      this.is_loading = false
      this.email_data = res['data']
      console.log(this.email_data,'sdfgsdfgsdfgsdfemail')
    }
    else {
      this.is_loading = false
      console.log('error')
      this.userMessage = res['message']
    }
  })
}

}
