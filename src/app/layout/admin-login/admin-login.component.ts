import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/services/user.service'
import { Router } from '@angular/router';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrComponent } from '../../@theme/components/toastr/toastr.component'
import {EncriptionService} from '../../@core/services/encription.service'
@Component({
  selector: 'ngx-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  serverErrorMessages: string;
  login_form_admin: FormGroup
  message = ""
  is_alert = false
  is_loading = false

  constructor(
    private userService: UserService, private router: Router, fb: FormBuilder, private toastr: ToastrComponent,private EncriptionService:EncriptionService) {
      this.removeLocalStorage()
    this.login_form_admin = fb.group({
      "email": ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      "password": ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    this.is_loading = true
    if (!this.login_form_admin.valid) {
      this.is_loading = false
      this.showAlert('Please provide required data')
      return
    }

    this.userService.admin_login(this.login_form_admin.value).then(
      res => {
        console.log(res)
        this.is_loading = false
        if (!res) {
          this.is_loading = false
          this.showAlert('There is no Internet connection')
          return;
        }
        if (res['status'] == 100) {
           localStorage.setItem("opm_user",this.EncriptionService.request_encript(res['data']['user']))
          console.log('access token',res['data']['access_token'])
          localStorage.setItem("opm_refresh_token", res['data']['refresh_token']);
          localStorage.setItem("opm_token", res['data']['access_token']);
         

          // this.asyncLocalStorage.setItem('opmt', 'a').then(res=>{
          //   this.router.navigateByUrl('/pages/admin-dashboard');
          // })
         localStorage.setItem('opmt',this.EncriptionService.request_encript('a'));
        this.router.navigateByUrl('/pages/admin-dashboard');
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

  removeLocalStorage() {
    localStorage.removeItem('opm_refresh_token');
    localStorage.removeItem('opm_token');
    localStorage.removeItem('opm_user');
    localStorage.removeItem('opmt');
  }

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

}
