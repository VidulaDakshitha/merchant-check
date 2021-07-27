import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {UserService} from '../../@core/services/user.service'
import {ToastrComponent} from '../../@theme/components/toastr/toastr.component'
​
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import {EncriptionService} from '../../@core/services/encription.service'
​
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // model = { phone_no: '', password: '' }
  serverErrorMessages: string;
  login_form: FormGroup
  message = ""
  is_alert = false
  is_loading = false
  user_list: any[]
  fieldTextType: boolean;
  po_format = "+94"
  type
​
​
​
  constructor(
     private router: Router, private userService: UserService, fb: FormBuilder, private toastr: ToastrComponent,private idle: Idle, private keepalive: Keepalive,private EncriptionService:EncriptionService) {
       this.removeLocalStorage()
    this.login_form = fb.group({
      "email": ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      "password": ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#].{7,}$')]],
    });
  }
​
  ngOnInit() {
   
  }
​
​
  login() {
   
    this.is_loading = true
    if (!this.login_form.valid) {
      this.is_loading = false
      this.showAlert('Please provide required data')
      return;
    }
​
    this.userService.merchant_login(this.login_form.value).then(
      res => {
        console.log(res,'ressss eeeeee')
        this.is_loading = false
        if (!res) {
          this.showAlert('There is no Internet connection')
          return;
        }
        if (res['status'] == 100) {
​
​
          localStorage.setItem("opm_user",this.EncriptionService.request_encript(res['data']['user']))
      
          localStorage.setItem("opm_refresh_token", res['data']['refresh_token']);
          localStorage.setItem("opm_token", res['data']['access_token']);
    
          localStorage.setItem("opm_business_type", this.EncriptionService.request_encript(res['data']['business_type']));
           localStorage.setItem("is_approved", JSON.stringify(res['data']['user']['is_approved']));
          
          this.user_list = res['data']['user'];
          console.log('user test000',this.user_list)
          
​
          if (res['data']['user']['is_merchant']) {
            // this.asyncLocalStorage.setItem('opmt', 'm').then(res=>{
            //   this.router.navigateByUrl('/pages/submit-document');
            // })
​
           this.asyncLocalStorage.setItem('opmt',this.EncriptionService.request_encript('m')).then(res=>{
              this.router.navigateByUrl('/pages/submit-document');
            })
​
            //  localStorage.setItem('opmt',this.EncriptionService.request_encript('m'));
            //   this.router.navigateByUrl('/pages/submit-document');
​
          } else if (res['data']['user']['is_digitaluser']) {
              localStorage.setItem('opmt',this.EncriptionService.request_encript('d'));
              this.router.navigateByUrl('/pages/digital-user-profile');
            // this.asyncLocalStorage.setItem('opmt', 'd').then(res=>{
            //   this.router.navigateByUrl('/pages/digital-user-profile');
            // })
          }
          
        
        } else {
          this.showAlert(res['message'])
        }
      },
      err => {
        this.is_loading = false
        this.showAlert('Internal Server error')
      }
    );
  }
​
  showAlert(message) {
    this.is_alert = true
    this.message = message
    setTimeout(() => {    
      this.is_alert = false
    }, 2000);
  }
​
  removeLocalStorage() {
    localStorage.removeItem('opm_refresh_token');
    localStorage.removeItem('opm_token');
    localStorage.removeItem('opm_user');
    localStorage.removeItem('opmt');
    localStorage.removeItem('is_approved');
      localStorage.removeItem('opm_business_type');
  }
​
  asyncLocalStorage = {
    setItem: function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    }
};
// password 
toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
​
​
}