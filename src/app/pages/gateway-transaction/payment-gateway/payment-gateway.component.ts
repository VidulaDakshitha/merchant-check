import { Component, OnInit,TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@theme/components'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { PaymentGatewayService} from '../../../@core/services/payment-gateway.service'
import { from } from 'rxjs';



@Component({
  selector: 'ngx-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
 
  addIpgUserForm: FormGroup;
  viewPasswordForm: FormGroup;
  userActivationForm:FormGroup;

  is_loading = false
  userMessage
  add_ipg_user_model
  view_password_model
  user_activation_model
  fieldTextType: boolean;

  constructor(
    private toastr: ToastrComponent,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private paymentGatewayService: PaymentGatewayService,
  ) {
    this.addIpgUserForm = fb.group({
      "user_name": ['', [Validators.required]],
      "password": ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#].{7,}$')]],
      "description": [''],
    });
    this.viewPasswordForm = fb.group({
      "password": ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#].{7,}$')]],
      "administrater_password": ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#].{7,}$')]],
    });
    this.userActivationForm = fb.group({
      "is_active_user": ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }
  openAddIpgUser(dialogaddIpgUser: TemplateRef<any>) {
    this.add_ipg_user_model = this.dialogService.open(dialogaddIpgUser,{closeOnBackdropClick:false });
  }

  addIpgUserData() {
    this.is_loading = true
    this.paymentGatewayService.addIpgUserData(this.addIpgUserForm.value).then(res => {
      if (res['success']) {
        this.is_loading = false
        this.add_ipg_user_model.close()
        this.addIpgUserForm.reset()
        this.toastr.showToast('success', 'success', 'Add Collection Type Success')
      } else {
        this.is_loading = false
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }
  //view password
  openViewPassword(dialogViewPassword: TemplateRef<any>) {
    setTimeout(() => {
      this.viewPasswordForm.setValue({
        administrater_password: '',
        password: 'Shs@1992',
      });
    }, 0);
    this.view_password_model = this.dialogService.open(dialogViewPassword,{closeOnBackdropClick:false });
  }

  // viewPasswordData() {
  //   this.is_loading = true
  //   this.paymentGatewayService.updateViewPasswordData(this.viewPasswordForm.value).then(res => {
  //     if (res['success']) {
  //       this.is_loading = false
  //       this.view_password_model.close()
  //       this.viewPasswordForm.reset()
  //       this.toastr.showToast('success', 'success', 'Collections Type Update Success')
  //     } else {
  //       this.is_loading = false
  //       this.userMessage = res['description']
  //       this.toastr.showToast('danger', 'error', this.userMessage)
  //     }
  //   }, error => {
  //     this.is_loading = false

  //     this.toastr.showToast('danger', 'error', 'Internal Server Error')
  //   })
  // }

  //add ipg user password 
toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
//copy password

 copy_password() {
    var copyText = document.getElementById("pwd_spn");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

// user activation
openUserActivationChange(dialogUserActivationChange: TemplateRef<any>) {
  // setTimeout(() => {
  //   this.viewPasswordForm.setValue({
  //     administrater_password: '',
  //     password: 'Shs@1992',
  //   });
  // }, 0);
  this.user_activation_model = this.dialogService.open(dialogUserActivationChange,{closeOnBackdropClick:false });
}

}
