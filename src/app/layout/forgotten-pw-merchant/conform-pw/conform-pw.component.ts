import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../@core/services/user.service';


@Component({
  selector: 'ngx-conform-pw',
  templateUrl: './conform-pw.component.html',
  styleUrls: ['./conform-pw.component.scss']
})
export class ConformPwComponent implements OnInit {
  phone_no = ""
  confirm_pw_from: FormGroup
  serverErrorMessages: string;
  message = ""
  is_alert = false
  is_alert_succes = false
  is_loading = false
  userMessage
  queryParams
  allParams
  fieldTextType: boolean;
  fieldTextTypeRepeat: boolean;

  constructor(private route: ActivatedRoute, private router: Router,fb: FormBuilder,
    private userService: UserService,
   
    ) {
      this.confirm_pw_from = fb.group({
        phone_number: [''],
        "new_password": ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#].{7,}$')]],
        "confirm_password": ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#].{7,}$')]],
      });

      
     }

  ngOnInit() {
    

    if (this.route.snapshot.queryParams && this.route.snapshot.queryParams['phone_no']) {
        this.phone_no = this.route.snapshot.queryParams['phone_no']
        
    } else {
      console.log('kkllll')
      this.router.navigate(['/reset-password'])
    }
    this.allParams = this.route.snapshot.queryParams
  }

  confirmPassword() {
    // console.log('phone number', this.queryParams['phone_no'])
    this.is_loading = true

    let password = this.confirm_pw_from.value['new_password']
    let psw_repeat = this.confirm_pw_from.value['confirm_password']
    let phone_number = this.route.snapshot.queryParams['phone_no']

    if (!password || !psw_repeat) {
      this.showAlert('Required Password')
      console.log('Required Password')
      this.is_loading = false
      return;
    }

    if (password != psw_repeat) {
      this.showAlert('The passwords did not match. Please try again')
      console.log('The passwords did not match.Please try again')
      this.is_loading = false
      return;
    }
    console.log('xx')
    let data = {
      phone_number: this.allParams['phone_no'],
      new_password: password,
      confirm_password: psw_repeat
    }
    console.log(data,'hhhhhh ddjf rest')
    this.userService.postPwResetData(data).then(res=>{
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
  // password validators
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypeRepeat() {
    this.fieldTextTypeRepeat = !this.fieldTextTypeRepeat;
  }


}
