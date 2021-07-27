import { Component, OnInit, OnDestroy,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { PdfExportService } from '../../../@core/services/pdf-export.service'
import { Subscription } from 'rxjs/Subscription';
import { NbDatepickerComponent } from '@nebular/theme';
import {UserService} from '../../../@core/services/user.service';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@theme/components';

@Component({
  selector: 'ngx-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.scss']
})
export class AddMerchantComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  forthForm: FormGroup;
  fifthForm: FormGroup;
  bTypeForm: FormGroup;
  organization_directors = []
  default_director_id = 1
  is_directors = true
  base64_file_array = []
  addType_model
  userMessage

  organization_shareholder = []
  default_shareholder_id = 1
  is_shareholders = true
  files: any = [];
  data=[] 
  subtype =[] = []
  id = ''
  data_array=[]

  p: number = 1;
  total: number = 0;
  pageSize: number = 10;


  addDirectorForm: FormGroup;
  isValidFormSubmitted = null;

  addShareholdereForm: FormGroup;
  isValidFormSubmitteds = null;

  business_categories = []
  business_type = []
  bank_list = []
  basic_data =[]
  category =[]
  service_provider_details=[]
  is_loading = false

  po_format = "+94"
  contact_p_po_format = "+94"

  constructor(private fb: FormBuilder, private pdfExportService: PdfExportService, 
    private userService:UserService,private dialogService: NbDialogService,
    private toastr: ToastrComponent) { }

  ngOnInit() {
    this.firstForm = this.fb.group({
      service_provider_name: ['', Validators.required],
      service_provider_address: ['', Validators.required],
      service_provider_registration_no: ['', Validators.required],
      contact_person_name: ['', Validators.required],
      contact_person_designation: ['', Validators.required],
      contact_person_Number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^(?:\\+94)[0-9]{9,10}$')]],
      // contact_person_Number: ['',[Validators.required,Validators.pattern('^(?:\\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\\d)\\d{6}$')]],
      business_type: ['', Validators.required],
      business_category: ['', Validators.required],
      registered_business_name: [''],
      register_number: [''],
      tranding_name: ['', Validators.required],
      principal_place: ['', Validators.required],
      correspondence_address: ['', Validators.required],
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^(?:\\+94)[0-9]{9,10}$')]],
      sub_type:['']
      // phone_number: ['',[Validators.required,Validators.pattern('^(?:\\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\\d)\\d{6}$')]],
    });


    this.forthForm = this.fb.group({
      nature_of_business: ['', Validators.required],
      income_tax: [''],
      date_of_registration: ['', Validators.required],
      account_holder_name: ['', Validators.required],
      account_number: ['', Validators.required],
      bank: ['', Validators.required],
      bank_name: [''],
      b_cat_name: [''],
      b_type_name: [''],
      branch: ['', Validators.required],
      commission_rate_visa: ['',Validators.pattern('^(\\d*\.)?\\d+$')],
      commission_rate_just_pay: ['',Validators.pattern('^(\\d*\.)?\\d+$')],
      commission_rate_lanka_qr: ['',Validators.pattern('^(\\d*\.)?\\d+$')],
      merchant_agreement_date: ['', Validators.required],

    });
    this.fifthForm = this.fb.group({
      forthCtrl: [''],
      forthCtrl2: [''],

    });
    this.bTypeForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
    });


    this.addDirectorForm = this.fb.group({
      director: this.fb.array([], [Validators.required])
    });

    this.addShareholdereForm = this.fb.group({
      shareholder: this.fb.array([], [Validators.required])
    });
//bank&bCat&BType
    // this.getBusinessCategory()
    // this.getBusinessType()
    // this.getBank()
    this.getServiceProviderDetails()

  }
  
  onFirstSubmit() {
    
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    console.log('jjjj', this.addDirectorForm)
    this.isValidFormSubmitted = false;
    if (this.addDirectorForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    let team = this.addDirectorForm.value;
    console.log('kk', team)
    this.addDirectorForm.reset();
    // this.secondForm.markAsDirty();
  }



  onThirdSubmit() {
    console.log('jjjj', this.addShareholdereForm)
    this.isValidFormSubmitteds = false;
    if (this.addShareholdereForm.invalid) {
      return;
    }
    this.isValidFormSubmitteds = true;
    let team = this.addShareholdereForm.value;
    console.log('kk', team)
    this.addShareholdereForm.reset();
  }

  onforthSubmit() {
    this.forthForm.markAsDirty();
  }
  onFifthSubmit() {
    this.forthForm.markAsDirty();
  }

  //director start
  validate_directors(is_enable) {
    this.is_directors = !is_enable
    this.resetDirectorForm()
    this.addDirectorForm = this.fb.group({
      director: this.fb.array(
        [],
        [Validators.required])
    });
  }
  createEmpFormGroup() {
    return this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nic: ['',[Validators.required,Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{12})$')]],
      director_pep: ['', [Validators.required]],
     
    })
  }

  get director(): FormArray {
    try {
      return this.addDirectorForm.get('director') as FormArray;

    } catch (ex) {
      console.log(ex)
    }
  }

  resetDirectorForm() {
    this.addDirectorForm.reset();
  }
  addDirector() {
    let fg = this.createEmpFormGroup();
    this.director.push(fg);
  }
  deleteDirector(i: number) {
    this.director.removeAt(i);
    // console.log('test idx',this.director.removeAt(idx))
  }
  //director end




  //shareholder start
  validate_shareholder(is_enable) {
    this.is_shareholders = !is_enable
    this.resetShareholderForm()
    this.addShareholdereForm = this.fb.group({
      shareholder: this.fb.array(
        [],
        [Validators.required])
    });
  }
  createShareholderFormGroup() {
    return this.fb.group({
      name_shareholder: ['', [Validators.required]],
      address_shareholder: ['', [Validators.required]],
      percentage_shareholder: ['',[Validators.required,Validators.pattern('^(\\d*\.)?\\d+$')]],
      shareholder_pep: ['', [Validators.required]],
    })
  }

  get shareholder(): FormArray {
    try {
      return this.addShareholdereForm.get('shareholder') as FormArray;

    } catch (ex) {
      console.log(ex)
    }
    // return this.addShareholdereForm.get('shareholder') as FormArray;
  }
  

  resetShareholderForm() {
    this.addShareholdereForm.reset();
  }
  addShareholder() {
    let fg = this.createShareholderFormGroup();
    this.shareholder.push(fg);
  }
  deleteShareholder(i: number) {
    this.shareholder.removeAt(i);
  }
  //shareholder end

  // upload file and remove
  async uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
      this.base64_file_array.push(await this.getBase64(element))
      console.log(element)
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  getBase64(file) {
    return new Promise(function(resolve) {
      var reader = new FileReader();
      reader.onloadend = function() {
        resolve(reader.result)
      }
      reader.readAsDataURL(file);
    })
  }


  test() {
    console.log(this.firstForm)
  }

  submit_application() {
    let basic_data = {
      ...this.firstForm.value,
      ...this.forthForm.value,
      ...this.addDirectorForm.value,
      ...this.addShareholdereForm.value,
      sub_type: this.data_array
    }

    basic_data['files'] = this.base64_file_array
    let bank_details = this.bank_list.find(bank => bank.id == basic_data['bank']);
    basic_data['bank_name'] = bank_details['name']

    let buss_cat = this.business_categories.find(business_category => business_category.id == basic_data['business_category']);
    basic_data['b_cat_name'] = buss_cat['type']

    let buss_type = this.business_type.find(business_type => business_type.id == basic_data['business_type']);
    basic_data['b_type_name'] = buss_type['type']

    console.log(basic_data, 'ff')



    let formatted_data =this.basic_data

    // this.userService.add_merchant(basic_data).then(res=>{
    //   console.log(res)
    // })



    this.userService.add_merchant(basic_data).then(res => {
      this.is_loading = true
      if(res['success']) {
        this.is_loading = false
        this.pdfExportService.exportToPdf(basic_data)
        this.addDirectorForm.reset()
        this.addDirectorForm.reset()
        this.toastr.showToast('success', 'success','Add Merchant Success')
      } else {
        this.is_loading = false
      
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }console
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
    

  }
  resetForm(){
    
  }

  ngOnDestroy(): void {

    
  }
//get business cat
  // getBusinessCategory() {
  //   this.is_loading = true
  //   this.userService.getBusinessCategory().then(res=>{
  //     if (res['success']) {
  //       this.is_loading = false
  //       this.business_categories = res['data']['business_categories']
  //     }
  //   })
  // }
//get business type
getBusinessType(page,limit) {
  this.is_loading = true
  this.userService.getBusinessType(page,limit).then(res=>{
    if (res['success']) {
      this.is_loading = false
      this.business_type = res['data']['business_type']
    }
  })
}
//get bank
getBank(page,limit) {
  this.is_loading = true
  this.userService.getBank(page,limit).then(res=>{
    if (res['success']) {
      this.is_loading = false
      this.bank_list = res['data']
    }
  })
}
//add business Type
open2(dialog: TemplateRef<any>) {
  this.addType_model = this.dialogService.open(dialog ,{closeOnBackdropClick:false });
}
close2() {
  this.bTypeForm.reset()
  this.addType_model.close()
}
//get service provider
getServiceProviderDetails() {
  this.userService.getServiceProvider().then(res=>{
    if (res['success']) {
      this.firstForm.controls.service_provider_name.setValue(res['data'].service_provider_name);
      this.firstForm.controls.service_provider_address.setValue(res['data'].service_provider_address);
      this.firstForm.controls.service_provider_registration_no.setValue(res['data'].service_provider_registration_no);
      this.firstForm.controls.contact_person_name.setValue(res['data'].contact_person_name);
      this.firstForm.controls.contact_person_designation.setValue(res['data'].contact_person_designation);
      this.firstForm.controls.contact_person_Number.setValue(res['data'].contact_person_Number);
    }
    else {
      console.log('error')
      this.userMessage = res['description']
      this.toastr.showToast('danger', 'error', this.userMessage)
    }
  }
  )
}
//add bussiness type
addBType() {
  this.is_loading = true
  this.userService.postTypeData(this.bTypeForm.value).then(res => {
    console.log(this.bTypeForm.value)
    console.log(res)
    if (res['success']) {
      this.is_loading = false
      this.getBusinessType(this.p,this.pageSize)
      this.addType_model.close()
      this.bTypeForm.reset()
      this.toastr.showToast('success', 'success', 'Add Success')
    } else {
      this.is_loading = false
      console.log('error')
      this.userMessage = res['description']
      this.toastr.showToast('danger', 'error', this.userMessage)
    }
  }, error => {
    this.is_loading = false
    console.log(error)
    this.toastr.showToast('danger', 'error', 'Internal Server Error')
  })
}
/////get subtype
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

// chooseSubtype(event)  {
//   console.log(event,'ppppppppppppp')
//  let fg = event = this.fb.group({
//   id: this.fb.array(
//       [],
//       [Validators.required])
//   });
 
//   this.fifthForm['sub_type'].push(fg);
// }
setCheckedStatus(checked, data) {


  if(checked.target.checked) {
      this.data_array.push(data)
  } else {
      let index = this.data_array.indexOf(data);
      this.data_array.splice(index, 1);
  }

  console.log(this.data_array,'ffffffffffffffff')
}

}
