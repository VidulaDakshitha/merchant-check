
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../@core/services/user.service';
import { ToastrComponent } from '../../../@theme/components';
import  {Router} from '@angular/router'
@Component({
  selector: 'ngx-reset-pw-email',
  templateUrl: './reset-pw-email.component.html',
  styleUrls: ['./reset-pw-email.component.scss']
})
export class ResetPwEmailComponent implements OnInit {
  serverErrorMessages: string;
  get_otp_from: FormGroup
  message = ""
  is_alert = false
  is_alert_succes = false
  is_loading = false
  email_add
  contact_p_po_format = "+94"

  constructor(
    fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrComponent
  ) { 
    this.get_otp_from = fb.group({
      phone_number: ['',[Validators.required,Validators.pattern('^(?:\\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\\d)\\d{6}$')]],
    });
  }

  ngOnInit() {
    // this.dialogSendEmail()
  }
  getOtp() {
    this.is_loading = true
    if (!this.get_otp_from.valid) {
      this.is_loading = false
      this.showAlert('Please provide required data')
      return
    }
    this.userService.getOtp(this.get_otp_from.value.phone_number).then(
      res => {
        // setTimeout(function() {
        this.is_loading = false
        if (!res) {
          this.is_loading = false
          this.showAlert('Internal Server error')
          return;
        }
        if (res['status'] == 100) {
          console.log('kkkkk')
          this.email_add = res['data']
          // console.log('ddd',this.email_add.email)
          this.showAlertSucces('Otp send success')
          this.router.navigate(['/otp-verification'], { queryParams: { phone_no: this.get_otp_from.value['phone_number']} })
        } else {
          this.showAlert(res['message'])
        }
      },
    
      err => {
        console.log(err)
        this.is_loading = false
        this.showAlert('Internal Server error')
      }
    );

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

 

}
