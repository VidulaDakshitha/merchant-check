import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../@core/services/user.service';
import {ActivatedRoute, Router} from  '@angular/router'

@Component({
  selector: 'ngx-confirm-merchant',
  templateUrl: './confirm-merchant.component.html',
  styleUrls: ['./confirm-merchant.component.scss']
})
export class ConfirmMerchantComponent implements OnInit {
  is_active_onepay_agreement = true
  is_pw_change = false
  allParams
  is_alert = false
  is_loading = false
  message = ''
  userMessage
  fieldTextType: boolean;
  fieldTextTypeRepeat: boolean;

  login_form : FormGroup
  constructor(
    fb: FormBuilder, private user_service: UserService, private route: ActivatedRoute, private router: Router
  ) {

    this.login_form = fb.group({
      "psw": ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#].{7,}$')]],
      "psw-repeat": ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#].{7,}$')]],
    });
   }

  ngOnInit() {
    this.allParams = this.route.snapshot.queryParams
  }

  // agreeOnepayAgreement() {
  //   this.is_active_onepay_agreement = false
  //   this.is_active_bank_agreement = true
  //   this.is_pw_change= false
  // }

  // agreeBankAgreement() {
  //   this.is_active_onepay_agreement = false
  //   this.is_active_bank_agreement = false
  //   this.is_pw_change= true
  // }

  verify_merchant() {
    this.is_loading = true

    let password = this.login_form.value['psw']
    let psw_repeat = this.login_form.value['psw-repeat']

    if (!password || !psw_repeat) {
      this.showAlert('Required Password')
      this.is_loading = false
      console.log('Required Password')
      return;
    }

    if (password != psw_repeat) {
      this.showAlert('The passwords did not match. Please try again')
      this.is_loading = false
      console.log('Password Missmatched')
      return;
    }
    console.log('xx33')
    let data = {
      user_id: this.allParams['user_id'],
      token: this.allParams['token'],
      new_password: password,
      confirm_password: psw_repeat
    }

   
    console.log(data,'reset data')
    this.user_service.verifyMerchantData(data).then(res=>{
    
      if (res['status'] == 100) {
        this.is_loading = false
        console.log('sucess')
        this.router.navigate(['/login'])
      } else {
        this.userMessage = res['message']
        this.is_loading = false
        this.showAlert(this.userMessage)
       
      }
    })
  }


  showAlert(message) {
    this.is_loading = false
    this.is_alert = true
    this.message = message
    setTimeout(() => {    
      this.is_alert = false
    }, 2000);
  }
  // password validators
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypeRepeat() {
    this.fieldTextTypeRepeat = !this.fieldTextTypeRepeat;
  }

  

}
