import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../@core/services/user.service';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@theme/components';
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'ngx-view-pending-merchant',
  templateUrl: './view-pending-merchant.component.html',
  styleUrls: ['./view-pending-merchant.component.scss']
})
export class ViewPendingMerchantComponent implements OnInit {

  merchantUpdateForm: FormGroup;
  shareholderUpdateForm: FormGroup;
  directorUpdateForm: FormGroup;
  documentApproveForm: FormGroup;
  documentRequestForm: FormGroup;
  markHardCopyForm: FormGroup;
  updateHardCopyForm: FormGroup;
  basicDataApproveForm: FormGroup;
  approvePackageForm: FormGroup;
  initialSetupFeeForm: FormGroup;
  addCustomizeItemForm: FormGroup;
  updateCustomizeItemForm: FormGroup;
  updatePackageForm: FormGroup;

  fileType=""
  p: number = 1;
  pageSize: number = 10;
  userMessage
  merchant
  merchant_bank = []
  business_catogory = []
  business_type = [] = []
  bank_list = []
  merchant_document = []
  hard_copyes = []
  merchant_requested_p_info= []
  merchant_customized_item = []
  customized_item = []
  package_payment =[]
  package_budget_data
  package_data
  payment_data=[]
  merchant_doc_data
  package_list = []
  file_status

  hardcopy_update_model
  image_base_path = environment.aws;
  image: any;
  is_loading = false
  update_shareholder_model
  update_director_model
  document_approvel_model
  document_request_model
  add_hardcopy_model
  basicdata_approval_model
  ApprovePackage_model
  initialSetupFee_model
  addCustomized_item_model
  cotomized_item_update_model
  approveDocument_model
  package_update_model
  resent_email_model
  files_view
  email_address

  phone_number_format = "+94"
  phone_number_format2 = "+94"
  phone_number_format_shareholder = "+94"
  phone_number_format_director = "+94"
  item = false
 
  itemindividual
  itemClub
  itemDirector
  itemShareholder
  itemBusinessNumber
  itemBusinessName = false
  itempartnership = false
  itemPartnershipname = false
  itemClubSocietis
  itemBR = false
  itemAgreement = false
  itemForm1 = false
  itemForm2015 = false
  itemAssociation = false
  itemform1 = false
  partnershipType = false

  image_lenth
  image_lenth_nic
  image_lenth_director
  image_length_nic_director

  basic_data = []

  partnership_types = ['propertior', 'partner', 'director']
  income_levels = ['Less than Rs.100,000', 'Rs.100,001-Rs.200,000', 'Rs.200,001-Rs.300,000', 'Rs.300,001-Rs.400,000', 'Rs.400,001-Rs.500,000', 'Rs.500,001-Rs.600,000', 'Above Rs.1,000,000']
  solo_dissabled = false

  identification_back: any
  perofessional_qualification: any
  income_certificate_gs: any
  transaction_freelance: any
  upload_br: any
  club_meeting: any
  club_members: any
  business_register_file: any
  partnership_agree: any
  form_20_length: any
  form_15_length: any
  articles_association: any
  form_1_length: any


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private toastr: ToastrComponent,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,

  ) {
    this.merchantUpdateForm = this.fb.group({
      user_id: [''],

      title: [''],
      gender: [''],
      first_name: [''],
      middle_name: [''],
      last_name: [''],
      nic: [''],
      contact_email: [''],
      designation: [''],
      contact_phone_no: [''],
      dob: [''],
      address: [''],
      city: [''],
      postal_code: [''],

      monthly_income: [''],
      wealth_generate: [''],

      business_type: [''],
      business_category: [''],
      register_number: [''],
      trading_name: [''],
      registered_business_name: [''],
      principal_place: [''],
      correspondence_address: [''],
      city_b_details: [''],
      postal_code_b_details: [''],
      email: [''],
      phone_number: [''],
      business_website: ['',],
      date_of_registration: [''],
      merchant_agreement_date: [''],
      income_tax_file_no: [''],
      nature_of_business: ['',],
      tin_number: ['',],
      facebook_page: ['',],
      instagrame: ['',],

      account_holder_name: [''],
      account_number: [''],
      bank: [''],
      branch: [''],
      type: [''],
    });
    this.shareholderUpdateForm = this.fb.group({
      user_id: ['', [Validators.required]],
      id: ['', [Validators.required]],
      name_shareholder: ['', [Validators.required]],
      address_shareholder: ['', [Validators.required]],
      percentage_shareholder: ['', [Validators.required,]],
      shareholder_pep: ['',],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phone_number: ['', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
    });
    this.directorUpdateForm = this.fb.group({
      user_id: ['', [Validators.required]],
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nic: ['', [Validators.required]],
      director_pep: [''],
      partnership: ['', [Validators.required]],
      income_level: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phone_number: ['', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
    });
    this.documentApproveForm = this.fb.group({
      user_id: ['', [Validators.required]],
      id: ['', [Validators.required]],
      // status: ['', [Validators.required]],

    });
    this.documentRequestForm = this.fb.group({
      file_type: ['', [Validators.required]],
      format: ['', [Validators.required]],

    });
    this.markHardCopyForm = this.fb.group({
      file_name: ['', [Validators.required]],
      ref_no: ['', [Validators.required]],
      merchant_id: [''],
    });
    this.updateHardCopyForm = this.fb.group({
      file_name: ['', [Validators.required]],
      ref_no: ['', [Validators.required]],
      id: [''],
    });
    this.basicDataApproveForm = this.fb.group({
      id: [''],
    });
    this.approvePackageForm = this.fb.group({
      is_approved: [''],
    });
    this.initialSetupFeeForm = this.fb.group({
      setup_fee_amount: [''],
      is_setup_fee_waved_off: ['',[Validators.required]],
      merchant_id: [''],
    });
    
    this.addCustomizeItemForm = this.fb.group({
      item_id: ['', [Validators.required]],
      is_budget_increase: [''],
      is_budget_decrease: [''],
      custom_limit: ['', [Validators.required]],
      amount: [''],
    });
    this.updateCustomizeItemForm = this.fb.group({
      // item_id: ['', [Validators.required]],
      is_budget_increase: [''],
      is_budget_decrease: [''],
      custom_limit: ['', [Validators.required]],
      amount: [''],
      id:[''],
    });
    this.updatePackageForm = this.fb.group({
      package_id: ['', [Validators.required]],
     
    });
    
  }

  ngOnInit() {
    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }

    this.getMerchantData()
    this.getBusinessCatogory()
    this.getBusinessType()
    this.getBank()
    this.getMerchanDocumentData()
    this.getHardCopyData()
    this.getrequestedpackageData()
    this.geCutomizedItemMerchant()
    this.geCutomizedItem()
    this.getPackageInfoAndPaymentInfo() 
    this.getAllPackageDetails()
    
    // this.getpackagePayment()
  }
  //get business catogory
  getBusinessCatogory() {
    this.userService.getBusinessCatMerchant().then(res => {
      if (res['status'] = 100) {
        this.business_catogory = res['data'];
        console.log(res['data'], 'business_cat');
      }
      else {
        console.log('error')
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    })
  }
  //get business type
  getBusinessType() {
    this.userService.getBusinessTypeMerchant().then(res => {
      if (res['status'] = 100) {
        this.business_type = res['data']['types'];
        console.log(res['data'], 'business_type');
      }
      else {
        console.log('error')
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    })
  }
  //get bank
  getBank() {
    this.userService.getBankData().then(res => {
      if (res['status'] = 100) {
        this.bank_list = res['data'];
        console.log(this.bank_list, 'bank');
      }
      else {
        console.log('error')
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    })
  }




  //get merchant details view
  getMerchantData() {
    this.userService.getMerchantDetailsView(this.route.snapshot.params.id).then(
      res => {
        console.log(res,'merchant data')

        this.is_loading = false
        if (res['status'] == 100) {
          
          if (res['data'].business_type === 'Individual') {
            setTimeout(() => {
              this.merchantUpdateForm.controls.registered_business_name.setValue(res['data'].first_name + " " + res['data'].middle_name + " " + res['data'].last_name);
              this.merchantUpdateForm.controls.trading_name.setValue(res['data'].first_name + " " + res['data'].middle_name + " " + res['data'].last_name);
            }, 1);

            this.chooseBtype(1)
          }


          this.merchant = res['data'];
          this.merchant_bank = res['data']['account_details']['0'];

          console.log(this.merchant, 'rrget')
          this.merchantUpdateForm.setValue({
            user_id: res['data'].user_id,
            title: res['data'].title,
            gender: res['data'].gender,
            first_name: res['data'].first_name,
            middle_name: res['data'].middle_name,
            last_name: res['data'].last_name,
            nic: res['data'].nic,

            contact_email: res['data'].contact_email,
            contact_phone_no: res['data'].contact_phone_no,

            designation: res['data'].designation,
            dob: res['data'].dob,
            address: res['data'].address_corr,
            city: res['data'].city,
            postal_code: res['data'].postal_code,
            monthly_income: res['data'].monthly_income,
            wealth_generate: res['data'].wealth_generate,
            business_type: res['data'].business_type_id,
            business_category: res['data'].business_cat_id,
            register_number: res['data'].register_no,
            trading_name: res['data'].trading_name ? res['data'].trading_name : '',
            registered_business_name: res['data'].business_name ? res['data'].business_name : '',
            principal_place: res['data'].p_place ? res['data'].p_place : '',
            correspondence_address: res['data'].address_corr,
            city_b_details: res['data'].city_b_details,
            postal_code_b_details: res['data'].postal_code_b_details,

            email: res['data'].user_email,
            phone_number: res['data'].user_phone_no,

            business_website: res['data'].business_website,
            date_of_registration: res['data'].date_of_reg,
            merchant_agreement_date: res['data'].merchant_agreement_date,
            income_tax_file_no: res['data'].income_tax,
            nature_of_business: res['data'].nature_of_business,
            tin_number: res['data'].tin_number,
            facebook_page: res['data'].facebook_page,
            instagrame: res['data'].ig_profile,
            bank: res['data']['account_details']['0'].bank_id,
            branch: res['data']['account_details']['0'].branch,
            type: res['data']['account_details']['0'].type,
            account_holder_name: res['data']['account_details']['0'].account_holder_name,
            account_number: res['data']['account_details']['0'].account_no,

          });
        }
        else {

          this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        console.log(err);
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }

  // file validation end
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  //update merchant
  updateMerchantData() {
    console.log((this.merchantUpdateForm.get('business_category').value === 3),'function')

    let request = {

      "user_id": this.merchantUpdateForm.value["user_id"],
      "title": this.merchantUpdateForm.value["title"],
      "gender": this.merchantUpdateForm.value["gender"],
      "first_name": this.merchantUpdateForm.value["first_name"],
      "middle_name": (this.merchantUpdateForm.value["middle_name"]) ? (this.merchantUpdateForm.value["middle_name"]) : '',
      "last_name": (this.merchantUpdateForm.value["last_name"]) ? (this.merchantUpdateForm.value["last_name"]) : '',
      "nic": this.merchantUpdateForm.value["nic"],
      "contact_email": this.merchantUpdateForm.value["contact_email"],
      "designation": this.merchantUpdateForm.value["designation"],
      "contact_phone_no": this.merchantUpdateForm.value["contact_phone_no"],
      "dob": (this.merchantUpdateForm.value["dob"]) ? (this.formatDate(this.merchantUpdateForm.value["dob"])) : '',
      "address": this.merchantUpdateForm.value["address"],
      "city": (this.merchantUpdateForm.value["city"]) ? (this.merchantUpdateForm.value["city"]) : '',
      "postal_code": this.merchantUpdateForm.value["postal_code"],
      "monthly_income": this.merchantUpdateForm.value["monthly_income"],
      "wealth_generate": this.merchantUpdateForm.value["wealth_generate"],


      "business_category": this.merchantUpdateForm.value["business_category"],

      "business_type": this.merchantUpdateForm.value["business_type"],

      "trading_name": this.merchantUpdateForm.get('trading_name').value ? this.merchantUpdateForm.get('trading_name').value : '',
      "principal_place": this.merchantUpdateForm.value["principal_place"],
      "correspondence_address": this.merchantUpdateForm.value["correspondence_address"],
      "city_b_details": this.merchantUpdateForm.value["city_b_details"],
      "postal_code_b_details": this.merchantUpdateForm.value["postal_code_b_details"],

      // "email": this.merchantUpdateForm.value["email"],
      // "phone_number": this.merchantUpdateForm.value["phone_number"],

      "business_website": this.merchantUpdateForm.value["business_website"],
      "date_of_registration": this.formatDate(this.merchantUpdateForm.value["date_of_registration"]),
      "merchant_agreement_date": this.formatDate(this.merchantUpdateForm.value["merchant_agreement_date"]),
      "nature_of_business": this.merchantUpdateForm.value["nature_of_business"],
      "facebook_page": this.merchantUpdateForm.value["facebook_page"],
      "tin_number": this.merchantUpdateForm.value["tin_number"] ? this.merchantUpdateForm.value["tin_number"] : '',
      "instagrame": this.merchantUpdateForm.value["instagrame"] ? this.merchantUpdateForm.value["instagrame"] : '',
      "income_tax_file_no": this.merchantUpdateForm.value["income_tax_file_no"] ? this.merchantUpdateForm.value["income_tax_file_no"] : '',
      "account_details": {
        "account_holder_name": this.merchantUpdateForm.value["account_holder_name"],
        "account_no": this.merchantUpdateForm.value["account_number"],
        "bank_id": this.merchantUpdateForm.value["bank"],
        "branch": this.merchantUpdateForm.value["branch"],
        "type": this.merchantUpdateForm.value["type"],
      },


    }
    if (this.merchantUpdateForm.get('business_category').value === 'Individual' && (this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && (this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Individual' && !(this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
    
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["email"] = this.merchantUpdateForm.get('email').value
      request["phone_number"] = this.merchantUpdateForm.get('phone_number').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Individual' && (this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["phone_number"] = this.merchantUpdateForm.get('phone_number').value
    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Individual' && !(this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && (this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["email"] = this.merchantUpdateForm.get('email').value
    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Sole Proprietorship' && !(this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Sole Proprietorship' && (this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && (this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["email"] = this.merchantUpdateForm.get('email').value
      request["phone_number"] = this.merchantUpdateForm.get('phone_number').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Sole Proprietorship' && (this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["phone_number"] = this.merchantUpdateForm.get('phone_number').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Sole Proprietorship' && !(this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["email"] = this.merchantUpdateForm.get('email').value

    }

    else if (this.merchantUpdateForm.get('business_category').value === 'Limited Liability' && (this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && (this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      console.log('succccccccc')
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Limited Liability' && !(this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["email"] = this.merchantUpdateForm.get('email').value
      request["phone_number"] = this.merchantUpdateForm.get('phone_number').value
    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Limited Liability' && (this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["phone_number"] = this.merchantUpdateForm.get('phone_number').value
    }
    else if (this.merchantUpdateForm.get('business_category').value ==='Limited Liability' && !(this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && (this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["email"] = this.merchantUpdateForm.get('email').value
    }



    else if (this.merchantUpdateForm.get('business_category').value === 'Partnership' && (this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && (this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Partnership' && !(this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["email"] = this.merchantUpdateForm.get('email').value
      request["phone_number"] = this.merchantUpdateForm.get('phone_number').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Partnership' && (this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["phone_number"] = this.merchantUpdateForm.get('phone_number').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Partnership' && !(this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && (this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["register_number"] = this.merchantUpdateForm.get('register_number').value,
      request["registered_business_name"] = this.merchantUpdateForm.get('registered_business_name').value
      request["email"] = this.merchantUpdateForm.get('email').value

    }


    else if (this.merchantUpdateForm.get('business_category').value === 'Clubs & Societies'  && (this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && (this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Clubs & Societies'  && !(this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
      request["email"] = this.merchantUpdateForm.get('email').value
      request["phone_number"] = this.merchantUpdateForm.get('phone_number').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Clubs & Societies'  && (this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && !(this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
     
      request["phone_number"] = this.merchantUpdateForm.get('phone_number').value

    }
    else if (this.merchantUpdateForm.get('business_category').value === 'Clubs & Societies'  && !(this.merchantUpdateForm.value["email"] === this.merchant['user_email']) && (this.merchantUpdateForm.value["phone_number"] === this.merchant['user_phone_no'])) {
     
      request["email"] = this.merchantUpdateForm.get('email').value

    }
  
    console.log(request,'request')
    this.is_loading = true
    this.userService.updateMerchantBasicData(request).then(res => {
      console.log(res)
      if (res['status'] == 100) {
        this.is_loading = false
        this.getMerchantData()
        this.toastr.showToast('success', 'success', 'Update Success')
      } else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }
  //update shareholder
  openShareholderUpdate(dialogShareholderUpdate: TemplateRef<any>, shareholder, merchant) {
    // let shareholder_pep = shareholder.shareholder_pep == 'Yes' ? 'true' : 'false'
    setTimeout(() => {
      this.shareholderUpdateForm.setValue({
        user_id: merchant.user_id,
        id: shareholder.id,
        name_shareholder: shareholder.name_shareholder,
        address_shareholder: shareholder.address_shareholder,
        percentage_shareholder: shareholder.percentage_shareholder,
        shareholder_pep: shareholder.shareholder_pep,
        email: shareholder.email,
        phone_number: shareholder.phone_number,
      });
    }, 1);
    this.update_shareholder_model = this.dialogService.open(dialogShareholderUpdate, { closeOnBackdropClick: false });
  }


  shareholderData() {
    this.is_loading = true
    let data = {
      "user_id": this.shareholderUpdateForm.value.user_id,
      "shareholder":
        [{
          "id": this.shareholderUpdateForm.value.id,
          "name_shareholder": this.shareholderUpdateForm.value.name_shareholder,
          "address_shareholder": this.shareholderUpdateForm.value.address_shareholder,
          "percentage_shareholder": this.shareholderUpdateForm.value.percentage_shareholder,
          "shareholder_pep": this.shareholderUpdateForm.value.shareholder_pep,
          // "shareholder_pep": this.shareholderUpdateForm.value.shareholder_pep == 'true' ? 'Yes' : 'No',
          "email": this.shareholderUpdateForm.value.email,
          "phone_number": this.shareholderUpdateForm.value.phone_number,
        }]
    }

    console.log('data get', data)

    this.userService.updateMerchantBasicData(data).then(res => {
      console.log(res)
      if (res['status'] == 100) {
        this.is_loading = false
        this.toastr.showToast('success', 'success', 'Update Success')
        this.update_shareholder_model.close()
        this.shareholderUpdateForm.reset()
        this.getMerchantData()
      } else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)

      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }

  //update director
  openDirectorUpdate(dialogDirectorUpdate: TemplateRef<any>, director, merchant) {
    // let shareholder_pep = shareholder.shareholder_pep == 'Yes' ? 'true' : 'false'
    setTimeout(() => {
      this.directorUpdateForm.setValue({
        user_id: merchant.user_id,
        id: director.id,
        name: director.name,
        address: director.address,
        director_pep: director.pep,
        partnership:director.partnership,
        nic: director.nic,
        email: director.email,
        phone_number: director.phone_number,
        income_level:director.income_level,
      });
    }, 1);
    this.update_director_model = this.dialogService.open(dialogDirectorUpdate, { closeOnBackdropClick: false });
  }


  directorData() {
    this.is_loading = true
    let data = {
      "user_id": this.directorUpdateForm.value.user_id,
      "merchant_business_owners":
        [{
          "id": this.directorUpdateForm.value.id,
          "name": this.directorUpdateForm.value.name,
          "address": this.directorUpdateForm.value.address,
          "nic": this.directorUpdateForm.value.nic,
          "partnership": this.directorUpdateForm.value.partnership,
          "director_pep": this.directorUpdateForm.value.director_pep,
          "email": this.directorUpdateForm.value.email,
          "phone_number": this.directorUpdateForm.value.phone_number,
          "income_level": this.directorUpdateForm.value.income_level,
        }]
    }

    console.log('data get44444444', data)

    this.userService.updateMerchantBasicData(data).then(res => {
      console.log(res)
      if (res['status'] == 100) {
        this.is_loading = false
        this.toastr.showToast('success', 'success', 'Update Success')
        this.update_director_model.close()
        this.directorUpdateForm.reset()
        this.getMerchantData()
      } else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)

      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }



  chooseBtype(event) {

    if (event == 2) {
      this.itemDirector = true
      this.itemShareholder = false
      this.itemBusinessNumber = true
      this.itemBusinessName = false
      this.itemindividual = false
      this.itempartnership = false
      this.itemClub = false
      this.itemPartnershipname = true
      this.partnership_types = ['propertior']
      this.onAddValidationClickBusinessnumber()
      this.onAddValidationClickBusinessname()

      this.solo_dissabled = true



      this.merchantUpdateForm.controls.registered_business_name.reset()
      this.merchantUpdateForm.controls.trading_name.reset()
      this.merchantUpdateForm.controls.registered_business_name.enable()
      this.merchantUpdateForm.controls.trading_name.enable()

    }
    else if (event == 3) {
      this.itemShareholder = true
      // this.itemDirector = false important
      this.itemDirector = true

      this.itemBusinessNumber = true
      this.itempartnership = true
      this.itemBusinessName = false
      this.itemindividual = false
      this.itemClub = false
      this.itemPartnershipname = false





      this.solo_dissabled = false


      this.onAddValidationClickBusinessnumber()
      this.onAddValidationClickBusinessname()
      this.onRemoveValidationClickBusinessname()


      this.merchantUpdateForm.controls.registered_business_name.reset()
      this.merchantUpdateForm.controls.trading_name.reset()
      this.merchantUpdateForm.controls.registered_business_name.enable()
      this.merchantUpdateForm.controls.trading_name.enable()
    }
    else if (event == 4) {

      this.itemShareholder = true
      this.itemDirector = true

      this.itemBusinessNumber = true
      this.itemBusinessName = false
      this.itemindividual = false
      this.itemClub = false
      this.itempartnership = true
      this.itemPartnershipname = false



      this.onAddValidationClickBusinessnumber()
      this.onAddValidationClickBusinessname()



      this.solo_dissabled = false
      this.partnership_types = ['director']

      this.merchantUpdateForm.controls.registered_business_name.reset()
      this.merchantUpdateForm.controls.trading_name.reset()
      this.merchantUpdateForm.controls.registered_business_name.enable()
      this.merchantUpdateForm.controls.trading_name.enable()

    }
    else if (event == 18) {
      this.itemShareholder = false
      this.itemDirector = true

      this.itemBusinessNumber = false
      this.itemBusinessName = true
      this.itemindividual = false
      this.itemClub = true
      this.itempartnership = true
      this.itemPartnershipname = false

      this.onRemoveValidationClickBusinessnumber()
      this.onRemoveValidationClickBusinessname()


      this.solo_dissabled = false
      this.partnership_types = ['President', 'Secretary']

      this.merchantUpdateForm.controls.registered_business_name.reset()
      this.merchantUpdateForm.controls.trading_name.reset()
      this.merchantUpdateForm.controls.registered_business_name.enable()
      this.merchantUpdateForm.controls.trading_name.enable()

    }

    else if (event == 1) {
      this.itemDirector = false
      this.itemShareholder = false
      this.itemBusinessNumber = false
      this.itemBusinessName = false
      this.itemindividual = true
      this.itemClub = false
      this.itempartnership = true
      this.itemPartnershipname = false
      this.merchantUpdateForm.controls.registered_business_name.setValue(this.merchantUpdateForm.value.first_name + " " + this.merchantUpdateForm.value.middle_name + " " + this.merchantUpdateForm.value.last_name);
      this.merchantUpdateForm.controls.trading_name.setValue(this.merchantUpdateForm.value.first_name + " " + this.merchantUpdateForm.value.middle_name + " " + this.merchantUpdateForm.value.last_name);
      this.merchantUpdateForm.controls.registered_business_name.disable();
      this.merchantUpdateForm.controls.trading_name.disable();
      this.onRemoveValidationClickBusinessnumber()
      this.onAddValidationClickBusinessname()

    }

  }
  //////////////////////////////////////////////////////////Registed Business number
  onAddValidationClickBusinessnumber() {
    this.merchantUpdateForm.controls["register_number"].setValidators(Validators.required);
    this.merchantUpdateForm.controls["register_number"].updateValueAndValidity();
  }

  onRemoveValidationClickBusinessnumber() {
    this.merchantUpdateForm.controls["register_number"].clearValidators();
    this.merchantUpdateForm.controls["register_number"].updateValueAndValidity();
  }
  ////////////////////////////////////////////////////////Registed Business name
  onAddValidationClickBusinessname() {
    this.merchantUpdateForm.controls["registered_business_name"].setValidators(Validators.required);
    this.merchantUpdateForm.controls["registered_business_name"].updateValueAndValidity();
  }

  onRemoveValidationClickBusinessname() {
    this.merchantUpdateForm.controls["registered_business_name"].clearValidators();
    this.merchantUpdateForm.controls["registered_business_name"].updateValueAndValidity();
  }



  /////////////////////////////////////////////////////////////////////////////document
  // get document
  getMerchanDocumentData() {
    this.userService.getMerchanDocument(this.route.snapshot.params.id).then(
      res => {

        this.is_loading = false
        if (res['status'] == 100) {
          this.merchant_document = res['data'];
          this.merchant_doc_data = res['merchant_document_data'];
          console.log(res, 'document merchant document eeeeeeeeeeee')
        }
        else {

          this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        console.log(err);
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }
  //all document approvel
  openApproveDocumentAll(dialogApproveDocumentAll: TemplateRef<any>) {
  
   this.approveDocument_model = this.dialogService.open(dialogApproveDocumentAll, { closeOnBackdropClick: false });
 }
 
 openApproveAllDoc() {
    let data = {
      "id":this.route.snapshot.params.id,
    }
    console.log(data,'get id')
    this.userService.updatedocumentApprovalAll(data).then(res => {
      console.log(res)
      if (res['status'] == 100) {
        this.is_loading = false
        this.toastr.showToast('success', 'success', 'Approve Success')
        this.approveDocument_model.close()
        this.getMerchanDocumentData()
        this.getMerchantData()

      } else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)

      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })



}

 

  // update document approvel

  openDocumentApprove(dialogDocumentApprove : TemplateRef<any>, file, merchant) {
    this.file_status = file.status
console.log(file)
    setTimeout(() => {
      this.documentApproveForm.setValue({
        user_id: merchant.user_id,
        id: file.id,
      });
    }, 1);
    this.fileType=file.format
    //this.image = this.sanitizer.bypassSecurityTrustResourceUrl(this.image_base_path + file.file_name)
    this.image = this.image_base_path + file.file_name
    console.log(this.image)
    this.document_approvel_model = this.dialogService.open(dialogDocumentApprove , { closeOnBackdropClick: false });
  }


  openApprobeData(key) {
    console.log(key)
    if (key == 1) {

      let data = this.documentApproveForm.value
      data.status = "APPROVED"
      this.userService.updatedocumentApprovalData(data).then(res => {
        console.log(res)
        if (res['status'] == 100) {
          this.is_loading = false
          this.toastr.showToast('success', 'success', 'Approve Success')
          this.document_approvel_model.close()
          this.getMerchanDocumentData()

        } else {
          this.is_loading = false
          this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)

        }
      }, error => {
        this.is_loading = false
        console.log(error)
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      })


    }
    else if (key == 2) {
      let data = this.documentApproveForm.value
      data.status = "REJECT"
      this.userService.updatedocumentApprovalData(data).then(res => {
        console.log(res)
        if (res['status'] == 100) {
          this.is_loading = false
          this.toastr.showToast('success', 'success', 'Reject Success')
          this.document_approvel_model.close()
          this.getMerchanDocumentData()

        } else {
          this.is_loading = false
          this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)

        }
      }, error => {
        this.is_loading = false
        console.log(error)
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      })

    }
  }

  // Request document 
  openRequestDoc(dialogRequestDoc: TemplateRef<any>) {
    this.document_request_model = this.dialogService.open(dialogRequestDoc, { closeOnBackdropClick: false });
  }


  documentRequestData() {
    let data = this.documentRequestForm.value
    data.merchant_id = this.merchant['id']
    this.userService.requestDoc(this.documentRequestForm.value).then(res => {
      console.log(res)
      if (res['status'] == 100) {
        this.is_loading = false
        this.toastr.showToast('success', 'success', 'Update Success')
        this.document_request_model.close()
        this.getMerchanDocumentData()

      } else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)

      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }

  // registration form hard copy
  getHardCopyData() {
    this.userService.getHardCopy(this.route.snapshot.params.id).then(
      res => {

        this.is_loading = false
        if (res['status'] == 100) {
          this.hard_copyes = res['data'];
          console.log(res['data'], 'hard_copyes333333333333333333333333333333333333333333333333333333333333333333333333333333333333333')
        }
        else {

          this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        console.log(err);
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }



  // add hardCopy
  openHardCopy(dialogHardCopy: TemplateRef<any>) {



    this.add_hardcopy_model = this.dialogService.open(dialogHardCopy, { closeOnBackdropClick: false });
  }


  hardCopyData() {
    let data = this.markHardCopyForm.value
    data.merchant_id = this.merchant['id']

    this.userService.addHardcopy(this.markHardCopyForm.value).then(res => {
      console.log(res)
      if (res['status'] == 100) {
        this.is_loading = false
        this.toastr.showToast('success', 'success', 'Update Success')
        this.add_hardcopy_model.close()
        this.getHardCopyData()

      } else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)

      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }


  //update hard copy
  openUpdateHardCopy(dialogUpdateHardCopy: TemplateRef<any>, hard_copy) {

    setTimeout(() => {
      this.updateHardCopyForm.setValue({
        id: hard_copy.id,
        file_name: hard_copy.file_name,
        ref_no: hard_copy.ref_no,
      });
    }, 1);
    this.hardcopy_update_model = this.dialogService.open(dialogUpdateHardCopy, { closeOnBackdropClick: false });
  }


  updatehardCopyData() {
    this.is_loading = true
    let data = this.updateHardCopyForm.value
    data.merchant_id = this.merchant['id']
    this.userService.updatetHardcopylData(this.updateHardCopyForm.value.id, data).then(res => {
      console.log(res)
      if (res['status'] == 100) {
        this.is_loading = false
        this.toastr.showToast('success', 'success', 'Update Success')
        this.hardcopy_update_model.close()
        this.updateHardCopyForm.reset()
        this.getHardCopyData()

      } else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)

      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }

  // basic data approval

  openBasicDataApproval(dialogBasicDataApproval: TemplateRef<any>, merchant) {

    setTimeout(() => {
      this.basicDataApproveForm.setValue({
        id: merchant.id,
      });
    }, 1);
    this.basicdata_approval_model = this.dialogService.open(dialogBasicDataApproval, { closeOnBackdropClick: false });
  }


  basicDataApproval() {

    let data = this.basicDataApproveForm.value
    data.is_basic_data_approved = 1
    this.userService.updateBasicData(this.basicDataApproveForm.value.id, data).then(res => {
      console.log(res)
      if (res['status'] == 100) {
        this.is_loading = false
        this.toastr.showToast('success', 'success', 'Baisic Update Success')
        this.basicdata_approval_model.close()
        this.getMerchantData()
        this.getPackageInfoAndPaymentInfo()


      } else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)

      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }
// get requested package info
  getrequestedpackageData() {
    this.userService.getrequestedpackageinfo(this.route.snapshot.params.id).then(
      res => {
        this.is_loading = false
        if (res['status'] == 100) {
          this.merchant_requested_p_info = res['data'];
        }
        else {
          this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        console.log(err);
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }
 //approve pakage
 openApprovePackage(dialogApprovePackage: TemplateRef<any>) {
   setTimeout(() => {
    this.approvePackageForm.setValue({
      is_approved: 1
    });
  }, 1);
  this.ApprovePackage_model = this.dialogService.open(dialogApprovePackage, { closeOnBackdropClick: false });
}

approvePackage() {
 
 let data = this.approvePackageForm.value
 data.merchant_id = this.route.snapshot.params.id,
 console.log(data,'approve')
 
  this.userService.approvePackage(data).then(res => {
    console.log(res)
    if (res['status'] == 100) {
      this.is_loading = false
      this.toastr.showToast('success', 'success', 'Update Success')
      this.ApprovePackage_model.close()

    } else {
      this.is_loading = false
      this.userMessage = res['message']
      this.toastr.showToast('danger', 'error', this.userMessage)

    }
  }, error => {
    this.is_loading = false
    console.log(error)
    this.toastr.showToast('danger', 'error', 'Internal Server Error')
  })
}

//initial setup free
choose(event) {
  console.log(event)
  if (event == "true") {
    this.item = false
  
  } else {
    this.item =true
  }
}
openInitialSetupFee(dialogInitialSetupFee: TemplateRef<any>,merchant) {

 this.initialSetupFee_model = this.dialogService.open(dialogInitialSetupFee, { closeOnBackdropClick: false });
}

initialSetupFeeData() {
  let request ={
    "merchant_id": this.route.snapshot.params.id
  } 
  if (this.initialSetupFeeForm.get('is_setup_fee_waved_off').value == "true"){
    request["is_setup_fee_waved_off"] = 1
    request["setup_fee_amount"] ='0.00'
  }
  else{
     request["setup_fee_amount"] = this.initialSetupFeeForm.value["setup_fee_amount"] ?this.initialSetupFeeForm.value["setup_fee_amount"] :"0.00" ,
     request["is_setup_fee_waved_off"] = 0
  }

  console.log(request,'initial setup')
 this.userService.addInitialPayment(request).then(res => {
   if (res['status'] == 100) {
     this.is_loading = false
     this.toastr.showToast('success', 'success', 'Baisic Update Success')
     this.initialSetupFee_model.close()
     this.getPackageInfoAndPaymentInfo()

   } else {
     this.is_loading = false
     this.userMessage = res['message']
     this.toastr.showToast('danger', 'error', this.userMessage)

   }
 }, error => {
   this.is_loading = false
   console.log(error)
   this.toastr.showToast('danger', 'error', 'Internal Server Error')
 })
}
// get customized items by merchant
geCutomizedItemMerchant() {
 
  this.userService.getCutomizedItemByMerchant(this.route.snapshot.params.id).then(
    res => {
      this.is_loading = false
      if (res['status'] == 100) {
        this.merchant_customized_item = res['data'];
       
      }
      else {

        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    },
    err => {
      this.is_loading = false
      console.log(err);
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    }
  );
}
// get_customizable_items
geCutomizedItem() {
  this.userService.geCutomizedItem().then(
    res => {
      this.is_loading = false
      if (res['status'] == 100) {
        console.log(res['data'],'customized_item' )
        this.customized_item = res['data'];
       
      }
      else {

        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    },
    err => {
      this.is_loading = false
      console.log(err);
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    }
  );
}
// customized package item add
openCustomizeItem(dialogCustomizeItem: TemplateRef<any>) {
 this.addCustomized_item_model = this.dialogService.open(dialogCustomizeItem, { closeOnBackdropClick: false });
}

addCutomizeItemData() {
  let request ={
    "merchant_id": this.route.snapshot.params.id,
    "custom_limit": this.addCustomizeItemForm.get('custom_limit').value,
    "item_id": this.addCustomizeItemForm.get('item_id').value,
    "is_budget_increase": (this.addCustomizeItemForm.get('is_budget_increase').value == true) ? 1 : 0,
    "is_budget_decrease": (this.addCustomizeItemForm.get('is_budget_decrease').value) == true? 1 : 0,
    "amount": (this.addCustomizeItemForm.get('amount').value) ? (this.addCustomizeItemForm.get('amount').value) : '0.00',

  } 
 this.userService.addCustomizedItem(request).then(res => {
   if (res['status'] == 100) {
     this.is_loading = false
     this.toastr.showToast('success', 'success', 'Success')
     this.addCustomized_item_model.close()
     this.geCutomizedItemMerchant()
     this.addCustomizeItemForm.reset()
     this.getPackageInfoAndPaymentInfo()

   } else {
     this.is_loading = false
     this.userMessage = res['message']
     this.toastr.showToast('danger', 'error', this.userMessage)

   }
 }, error => {
   this.is_loading = false
   console.log(error)
   this.toastr.showToast('danger', 'error', 'Internal Server Error')
 })
}


// customized package item update
openUpdateCustomizedItem(dialogUpdateCustomizedItem: TemplateRef<any>, customized_item) {
  
  setTimeout(() => {
    this.updateCustomizeItemForm.setValue({
      id:customized_item.id,
      is_budget_increase: customized_item.is_budget_increase,
      is_budget_decrease: customized_item.is_budget_decrease,
      custom_limit: customized_item.custom_limit,
      amount: customized_item.amount,
    });
  }, 1);
  this.cotomized_item_update_model = this.dialogService.open(dialogUpdateCustomizedItem, { closeOnBackdropClick: false });
}



updateCutomizeItemData() {
  let formatted_data = this.updateCustomizeItemForm.value
  formatted_data.amount = parseFloat(formatted_data.amount)
  formatted_data.custom_limit = parseFloat(formatted_data.custom_limit)


  console.log(this.updateCustomizeItemForm.value,'sssssssseeee')
  this.is_loading = true
  
  this.userService.updatetCustomizeData(this.updateCustomizeItemForm.value.id, this.updateCustomizeItemForm.value).then(res => {
    console.log(res)
    if (res['status'] == 100) {
      this.is_loading = false
      this.toastr.showToast('success', 'success', 'Update Success')
      this.cotomized_item_update_model.close()
      this.updateCustomizeItemForm.reset()
      this.geCutomizedItemMerchant()

    } else {
      this.is_loading = false
      this.userMessage = res['message']
      this.toastr.showToast('danger', 'error', this.userMessage)

    }
  }, error => {
    this.is_loading = false
    console.log(error)
    this.toastr.showToast('danger', 'error', 'Internal Server Error')
  })
}

// get package info and payment info
getPackageInfoAndPaymentInfo() {
  this.userService.getPackageInfoAndPaymentInfo(this.route.snapshot.params.id).then(
    res => {
      this.is_loading = false
      if (res['status'] == 100) {
        console.log(res,'package fkkfgfdgsdfgsdfgsdf')
       
        this.package_budget_data = res['data']['package_budget_data'];
        this.package_data = res['data']['package_data'];
        this.payment_data = res['data']['payment_data'];
        console.log(res['data'],'getPackageInfoAndPaymentInfo' )
       
      }
      else {

        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    },
    err => {
      this.is_loading = false
      console.log(err);
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    }
  );
}

// get all package
getAllPackageDetails() {
  this.userService.getPackageInfo().then(
    res => {
      this.is_loading = false
      if (res['status'] == 100) {
        this.package_list = res['data'];
        console.log(this.package_list,'package data data adata')
      }
      else {

        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    },
    err => {
      this.is_loading = false
      console.log(err);
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    }
  );
}

// update Requested Package
openChangePackage(dialogChangePackage: TemplateRef<any>, package_list,package_id) {
  setTimeout(() => {
    this.updatePackageForm.setValue({
      package_id:package_id,
    });
  }, 1);
  this.package_update_model = this.dialogService.open(dialogChangePackage, { closeOnBackdropClick: false });
}


updatePackage() {
  let data = this.updatePackageForm.value
  data['merchant_id'] = this.route.snapshot.params.id
  this.is_loading = true
  console.log(data,'change package')
  this.userService.postUpdatePackage(data).then(res => {
    console.log(res)
    if (res['status'] == 100) {
      this.is_loading = false
      this.toastr.showToast('success', 'success', 'Update Success')
      this.package_update_model.close()
      this.updatePackageForm.reset()
      this.getAllPackageDetails()
      this.getPackageInfoAndPaymentInfo()

    } else {
      this.is_loading = false
      this.userMessage = res['message']
      this.toastr.showToast('danger', 'error', this.userMessage)

    }
  }, error => {
    this.is_loading = false
    console.log(error)
    this.toastr.showToast('danger', 'error', 'Internal Server Error')
  })
}
// resent email
openResentEmail(dialogResentEmail: TemplateRef<any>) {
  this.email_address = this.merchant['user_email']
  console.log(this.email_address,'email sseee')
  
  this.resent_email_model = this.dialogService.open(dialogResentEmail, { closeOnBackdropClick: false });
}
resentEmail() {
  let data ={
    "user_id":this.merchant['user_id']
  }
  this.is_loading = true
  this.userService.postresentEmailData(data).then(res => {
    console.log(res)
    if (res['status'] == 100) {
      this.is_loading = false
      this.toastr.showToast('success', 'success', 'Email Sent Success')
      this.resent_email_model.close()
  

    } else {
      this.is_loading = false
      this.userMessage = res['message']
      this.toastr.showToast('danger', 'error', this.userMessage)

    }
  }, error => {
    this.is_loading = false
    console.log(error)
    this.toastr.showToast('danger', 'error', 'Internal Server Error')
  })
}







// package payment
// getpackagePayment() {
 
 
//   this.userService.getPackagepayment(this.merchant['user_id']).then(
//     res => {
//       this.is_loading = false
//       if (res['status'] == 100) {
//         console.log(res['data'],'package payment333333333333333333332222222222222222222222222222222222' )
//         this.package_payment = res['data'];
       
//       }
//       else {

//         this.userMessage = res['message']
//         this.toastr.showToast('danger', 'error', this.userMessage)
//       }
//     },
//     err => {
//       this.is_loading = false
//       console.log(err);
//       this.toastr.showToast('danger', 'error', 'Internal Server Error')
//     }
//   );
// }







}
