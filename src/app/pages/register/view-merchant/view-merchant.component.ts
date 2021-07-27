import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../../@core/services/user.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { BankService } from '../../../@core/services/bank.service';
import { ToastrComponent } from '../../../@theme/components';
import { Subscription } from 'rxjs/Subscription';




@Component({
  selector: 'ngx-view-merchant',
  templateUrl: './view-merchant.component.html',
  styleUrls: ['./view-merchant.component.scss']
})
export class ViewMerchantComponent implements OnInit {
  p: number = 1;
  total: number = 0;
  pageSize: number = 10;
  subscription: Subscription;
  merchant_data
  merchantForm: FormGroup;
  bankAccountForm: FormGroup;
  directorUpdateForm: FormGroup;
  shareholderUpdateForm: FormGroup;
  approvalForm: FormGroup;
  userActivationForm: FormGroup;
  addNewsubtypeForm: FormGroup;
  updateBtypeForm: FormGroup;
  update_merchant_model
  update_bank_account_model
  update_director_model
  update_shareholder_model
  user_activation_model
  user_Addnewsubtype_model
  update_merchant_btype_model
  is_loading = false
  bank_list = []
  business_categories = []
  business_type = []
  userMessage
  new_subtype

  file: any = []
  basic_data = []
  base64_file_array = []
  data = []
  subtype =[] = []
  data_array=[]
  id = ''


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private bankService: BankService,
    private toastr: ToastrComponent,
  ) {

    this.merchantForm = this.fb.group({
      id: ['', Validators.required],
      // business_type: [''],
      business_category: [''],
      registered_business_name: [''],
      register_number: [''],
      tranding_name: [''],
      principal_place: [''],
      correspondence_address: [''],
      merchant_agreement_date: [''],
      nature_of_business: [''],
      income_tax: [''],
      date_of_registration: [''],
      secret_key:[''],
      m_id: [''],
      qr_id: [''],
      address: [''],
    });
    this.updateBtypeForm = this.fb.group({
      id: ['', Validators.required],
      business_type: [''],
    });

    this.bankAccountForm = this.fb.group({
      id: ['', Validators.required],
      bank_id: [''],
      account_holder_name: [''],
      account_number: [''],
      branch: [''],
      commission_rate_visa: [''],
      commission_rate_just_pay: [''],
      commission_rate_lanka_qr: [''],
    });

    this.directorUpdateForm = this.fb.group({
      director: this.fb.array([], [Validators.required])
    });

    this.userActivationForm = this.fb.group({
      merchant_id: ['', Validators.required],
      is_active: ['', Validators.required],
      activation_description: ['', Validators.required],
    });

    this.directorUpdateForm = this.fb.group({
      id: ['', Validators.required],
      director_id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      nic: ['', [Validators.required, Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{12})$')]],
      director_pep: ['', Validators.required],

    });
    this.shareholderUpdateForm = this.fb.group({
      id: ['', Validators.required],
      shareholder_id: ['', Validators.required],
      name_shareholder: ['', Validators.required],
      address_shareholder: ['', Validators.required],
      percentage_shareholder: ['', Validators.required],
      shareholder_pep: ['', Validators.required],

    });
    this.approvalForm = this.fb.group({
      merchant_id: ['', Validators.required],
      m_id: [''],
      qr_id: [''],
      file: ['']
    });
    this.addNewsubtypeForm = this.fb.group({
      sub_type:[''],
      business_type: ['', Validators.required],
      // sub_type:[false],
    });
  }

  ngOnInit() {
    // this.getBank()
    // this.getBusinessCategory(this.p,this.pageSize)
    // this.getBusinessType()
    this.getBasicIndata()
   
    // this.focusInput()

  }
  // ngAfterViewInit() {
  //   this.focusInput()
  // }
  
  // focusInput() {
  //   let el = document.getElementById('search_input')
  //   setTimeout(() => {   
  //     el.focus()
  //   }, 300);
  // }

  // onResize(event){
  //   let self = this;
  //   setTimeout(() => {   
  //     self.focusInput()
  //   }, 300);
    
  // }




  onFifthSubmit() {
    this.approvalForm.markAsDirty();
  }
  //get business cat
  getBusinessCategory(page,limit) {
    this.userService.getBusinessCategory(page,limit).then(res => {
      if (res['success']) {
        this.business_categories = res['data']['business_categories']
        // console.log('test success', this.business_categories);
      }
      else {
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    })
  }
  //get business type
  // getBusinessType() {
  //   this.userService.getBusinessType().then(res => {
  //     if (res['success']) {

  //       this.business_type = res['data']['business_type'];
  //       console.log('this.business_type', this.business_type);
  //     }
  //     else {
  //       console.log('error')
  //       this.userMessage = res['description']
  //       this.toastr.showToast('danger', 'error', this.userMessage)
  //     }
  //   })
  // }


  //get bank
  // getBank() {
  //   this.userService.getBank().then(res => {
  //     if (res['success']) {
  //       this.bank_list = res['data']
  //     }
  //     else {
  //       console.log('error')
  //       this.userMessage = res['description']
  //       this.toastr.showToast('danger', 'error', this.userMessage)
  //     }
  //   })
  // }
  //////////////////////////////////////////////////////////////////////////////////////get merchant details
  getBasicIndata() {
    this.is_loading = true
    this.userService.getMerchantFullView(this.route.snapshot.params.id).then(res => {
      if (res['success']) {
        this.is_loading = false
        this.merchant_data = res["merchant"]
        console.log(this.merchant_data)
      }
      else {
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
   // get sub type
   getCollectionId(id: any) {
    console.log('klklklk', id)
    this.subtype = []= []
  ​
    this.userService.getSubtypeById(id).then(res=>{
      if (res['success']) {
       
        this.subtype = res['data']['subtype_data']
        console.log(this.subtype,'subtype data')
        
      }
      else {
        this.toastr.showToast('danger', 'Oh Snap!', res['description'])
      }
    }, error => {
      console.log(error);
      this.toastr.showToast('danger', 'Oh Snap!', 'Internal Server Error')
    })
  }
  choose(event) {
    console.log(event,'4444jjjjjjj')
    if (event) {
      this.id = event
      this.getCollectionId(event);
      console.log('subtype work')
    } else {
      this.subtype = []
      console.log('subtype work')
    }
    console.log('gg',event)
  }
  
  setCheckedStatus(checked, data) {
  
  
    if(checked.target.checked) {
        this.data_array.push(data)
    } else {
        let index = this.data_array.indexOf(data);
        this.data_array.splice(index, 1);
    }
  
    console.log(this.data_array,'ffffffffffffffff')
  }



  
  //////////////////////////////////////////////////////////////////////////////////////////////update merchant data
  openMerchant(dialogMerchant: TemplateRef<any>, merchant_data) {
    
    setTimeout(() => {
      this.merchantForm.setValue({
        id: merchant_data.id,
        // business_type: merchant_data.business_type_id,
        business_category: merchant_data.business_category_id,
        registered_business_name: merchant_data.registered_business_name,
        register_number: merchant_data.register_number,
        tranding_name: merchant_data.tranding_name,
        principal_place: merchant_data.principal_place,
        correspondence_address: merchant_data.correspondence_address,
        merchant_agreement_date: merchant_data.merchant_agreement_date,
        nature_of_business: merchant_data.nature_of_business,
        income_tax: merchant_data.income_tax,
        date_of_registration: merchant_data.date_of_registration,
        secret_key:merchant_data.has_secret_key,
        m_id:merchant_data.m_id ? merchant_data.m_id:'',
        qr_id:merchant_data.qr_id ? merchant_data.qr_id:'',
        address:merchant_data.qr_id ? merchant_data.address:'',

      });
    }, 1);
    this.update_merchant_model = this.dialogService.open(dialogMerchant,{closeOnBackdropClick:false });
  }

  updateMerchantData() {
    
    this.is_loading = true
    this.userService.updateMerchantData(this.merchantForm.value).then(res => {
      console.log(res)
      if (res['success']) {
        this.is_loading = false
        this.update_merchant_model.close()
        this.merchantForm.reset()
        this.getBasicIndata()
        this.toastr.showToast('success', 'success', 'Update Success')
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

  ///////////////////////////////////////////////////////////////////////////////////////////update bank account details
  openBankAccount(dialogBankAccount: TemplateRef<any>, merchant_data) {

    setTimeout(() => {
      this.bankAccountForm.setValue({
        id: merchant_data.id,
        account_holder_name: merchant_data.account_holder_name,
        account_number: merchant_data.account_number,
        bank_id: merchant_data.bank_id,
        branch: merchant_data.branch,
        commission_rate_just_pay: merchant_data.commission_rate_just_pay,
        commission_rate_lanka_qr: merchant_data.commission_rate_lanka_qr,
        commission_rate_visa: merchant_data.commission_rate_visa,

      });
    }, 1);
    this.update_bank_account_model = this.dialogService.open(dialogBankAccount,{closeOnBackdropClick:false });
  }

  updateBankAccountData() {
    this.is_loading = true
    this.userService.updateMerchantData(this.bankAccountForm.value).then(res => {
      console.log(res)
      if (res['success']) {
        this.is_loading = false
        this.update_bank_account_model.close()
        this.bankAccountForm.reset()
        this.getBasicIndata()
        this.toastr.showToast('success', 'success', 'Update Success')
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
  ////////////////////////////////////////////////////////////////////////////////////////////////Update director
  openDirectorUpdate(dialogDirectorUpdate: TemplateRef<any>, director, merchant_data) {
    let director_pep = director.director_pep == 'Yes' ? 'true' : 'false'
    setTimeout(() => {
      this.directorUpdateForm.setValue({
        id: merchant_data.id,
        director_id: director.id,
        nic: director.nic,
        name: director.name,
        address: director.address,
        director_pep: director_pep,
      });
    }, 1);
    this.update_director_model = this.dialogService.open(dialogDirectorUpdate,{closeOnBackdropClick:false });
  }


  updateDirectorData() {
    this.is_loading = true
    console.log('directorUpdateForm', this.directorUpdateForm.value)

    let data = {
      "id": this.directorUpdateForm.value.id,
      "director":
        [{
          "director_id": this.directorUpdateForm.value.director_id,
          "name": this.directorUpdateForm.value.name,
          "address": this.directorUpdateForm.value.address,
          "nic": this.directorUpdateForm.value.nic,
          "director_pep": this.directorUpdateForm.value.director_pep == 'true' ? 'Yes' : 'No'
        }]
    }

    this.userService.updateMerchantData(data).then(res => {
      console.log(res)
      if (res['success']) {
        this.is_loading = false
        this.getBasicIndata()
        this.toastr.showToast('success', 'success', 'Update Success')
        this.update_director_model.close()
        this.directorUpdateForm.reset()
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

  //////////////////////////////////////////////////////////////////////////////////////////////////// update shareholder
  openShareholderUpdate(dialogShareholderUpdate: TemplateRef<any>, shareholder, merchant_data) {
    let shareholder_pep = shareholder.shareholder_pep == 'Yes' ? 'true' : 'false'
    setTimeout(() => {
      this.shareholderUpdateForm.setValue({
        id: merchant_data.id,
        shareholder_id: shareholder.id,
        name_shareholder: shareholder.name_shareholder,
        address_shareholder: shareholder.address_shareholder,
        percentage_shareholder: shareholder.percentage_shareholder,
        shareholder_pep: shareholder_pep,
      });
    }, 1);
    this.update_shareholder_model = this.dialogService.open(dialogShareholderUpdate,{closeOnBackdropClick:false });
  }


  shareholderDirectorData() {
    this.is_loading = true
    console.log('shareholderUpdateForm', this.shareholderUpdateForm.value)

    let data = {
      "id": this.shareholderUpdateForm.value.id,
      "shareholder":
        [{
          "shareholder_id": this.shareholderUpdateForm.value.shareholder_id,
          "name_shareholder": this.shareholderUpdateForm.value.name_shareholder,
          "address_shareholder": this.shareholderUpdateForm.value.address_shareholder,
          "percentage_shareholder": this.shareholderUpdateForm.value.percentage_shareholder,
          "shareholder_pep": this.shareholderUpdateForm.value.shareholder_pep == 'true' ? 'Yes' : 'No'
        }]
    }

    this.userService.updateMerchantData(data).then(res => {
      console.log(res)
      if (res['success']) {
        this.is_loading = false
        this.getBasicIndata()
        this.toastr.showToast('success', 'success', 'Update Success')
        this.update_shareholder_model.close()
        this.shareholderUpdateForm.reset()
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

  /////////////////////////////////////////////////////////////////////////////////security-approved file

  async uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.file.push(element.name)
      this.base64_file_array.push(await this.getBase64(element))
      console.log(element)
    }
  }
  deleteAttachment(index) {
    this.file.splice(index, 1)
  }

  getBase64(files) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result)
      }
      reader.readAsDataURL(files);
    })
  }
  submit_application() {

    let basic_data = this.approvalForm.value
    basic_data['file'] = this.base64_file_array
    basic_data['merchant_id'] = this.merchant_data.id
    console.log(basic_data, 'ftttttf')

    this.userService.postApprovalData(basic_data).then(res => {
      this.is_loading = true
      if (res['success']) {
        console.log(basic_data, 'ftttttf success')
        this.is_loading = false
        this.approvalForm.reset()
        this.getBasicIndata()
        this.toastr.showToast('success', 'success', 'Add Files Success')
      } else {
        this.is_loading = false
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      } console
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })


  }
  //////////////////////////////////////////////////////////////////////////////////user activation
 
  openUserActivation(dialogUserActivation: TemplateRef<any>, merchant_data) {
    setTimeout(() => {
      this.userActivationForm.setValue({
        merchant_id: merchant_data.id,
        is_active: merchant_data.is_active,
        activation_description: merchant_data.activation_description,
       
      });
    }, 0);
    this.user_activation_model = this.dialogService.open(dialogUserActivation, { closeOnBackdropClick: false });
  }

  addUserActivation() {
    this.is_loading = true
    console.log('service', this.userActivationForm.value)
    this.userService.postUserActivation(this.userActivationForm.value).then(res => {

      if (res['success']) {
        this.getBasicIndata()
        this.is_loading = false
        this.user_activation_model.close()
        this.userActivationForm.reset()
        this.toastr.showToast('success', 'success', 'Status Change Success')
      } else {
        this.is_loading = false
        console.log('error')
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
      console.log(error)
    })
  }
  ///////////////////////////////////////add new subtype
  
  openAddNewSubtype(dialogAddNewSubtype: TemplateRef<any>, subtype,merchant_data) {
    console.log(merchant_data.business_type_id,'get sssssssssss')
    setTimeout(() => {
    
      this.addNewsubtypeForm.setValue({
        business_type: merchant_data.business_type_id,
        sub_type:''
      });
    }, 0);
  
  
  console.log(subtype,'sdfsdfsdfsd33333')

    this.user_Addnewsubtype_model = this.dialogService.open(dialogAddNewSubtype, { closeOnBackdropClick: false });
  }

  addNewsubtype() {
    this.is_loading = true
    let data = this.addNewsubtypeForm.value
        data['merchant_id'] = this.route.snapshot.params.id
        data['sub_type'] = this.data_array
    this.userService.postNewSubtype(data).then(res => {

      if (res['success']) {
        this.toastr.showToast('success', 'success', 'Add new subtype Success')
        this.getBasicIndata()
        this.is_loading = false
        this.user_Addnewsubtype_model.close()
        this.addNewsubtypeForm.reset()
      
      } else {
        this.is_loading = false
        console.log('error')
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
      console.log(error)
    })
  }
//update business type
openUpdatebtype(dialogUpdatebtype: TemplateRef<any>, merchant_data) {
    
    setTimeout(() => {
      this.updateBtypeForm.setValue({
        id: merchant_data.id,
        business_type: merchant_data.business_type_id,

      });
    }, 1);
    this.update_merchant_btype_model = this.dialogService.open(dialogUpdatebtype,{closeOnBackdropClick:false });
  }

  updatebusinesstype() {
    
    this.is_loading = true
    this.userService.updateMerchantData(this.updateBtypeForm.value).then(res => {
      console.log(res)
      if (res['success']) {
        this.is_loading = false
        this.update_merchant_btype_model.close()
        this.updateBtypeForm.reset()
        this.getBasicIndata()
        this.toastr.showToast('success', 'success', 'Update Business type Success')
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
