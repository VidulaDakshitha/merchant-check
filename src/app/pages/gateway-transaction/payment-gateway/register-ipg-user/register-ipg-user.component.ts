import { Component, OnInit,TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../../@theme/components'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { PaymentGatewayService} from '../../../../@core/services/payment-gateway.service'

@Component({
  selector: 'ngx-register-ipg-user',
  templateUrl: './register-ipg-user.component.html',
  styleUrls: ['./register-ipg-user.component.scss']
})
export class RegisterIpgUserComponent implements OnInit {

  deleteIpguserForm: FormGroup;
  addAppForm: FormGroup;
  delete_ipguser_model
  delete_app_add_model
  fieldTextType: boolean;

  constructor(
    private toastr: ToastrComponent,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private paymentGatewayService: PaymentGatewayService,
  ) { 
    this.deleteIpguserForm = this.fb.group({
      "id": ['', Validators.required],
      "permently_delete": ['', Validators.required],
    });
    this.addAppForm = this.fb.group({
      "app_name": ['', Validators.required],
      "description" : [''],
      "call_back_url": ['', Validators.required],
      "password": ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#].{7,}$')]],
      "origine": ['', Validators.required],
     
    });
  }

  ngOnInit() {
  }
  // delete ipag user
  openDeleteIpguser(dialogDeleteIpguser: TemplateRef<any>) {
    this.deleteIpguserForm.setValue({
      id: 1,
      permently_delete:''
  
  });
    this.delete_ipguser_model = this.dialogService.open(dialogDeleteIpguser,{closeOnBackdropClick:false });
  }
  // create app
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  openAddApp(dialogaddApp: TemplateRef<any>) {
    
    this.delete_app_add_model = this.dialogService.open(dialogaddApp,{closeOnBackdropClick:false });
  }
}
