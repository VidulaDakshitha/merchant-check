import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy, TemplateRef, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../@theme/components';
import { UserService } from '../../@core/services/user.service';
import { color } from 'html2canvas/dist/types/css/types/color';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'ngx-self-registration-merchant',
  templateUrl: './self-registration-merchant.component.html',

  styleUrls: ['./self-registration-merchant.component.scss',]
})
export class SelfRegistrationMerchantComponent implements OnInit {
  ngModelDate = new Date();
  @ViewChild('loadingModel', { static: false }) public loadingModel!: ModalDirective;
  @ViewChild('imageInput', { static: false }) fileUploader: ElementRef;
  // @ViewChild('imageInput1', { static: false }) fileUploader1: ElementRef;
  front_side
  back_side
  logo
  p_qualification
  gs
  freelance
  meeting_minute
  committee_members
  br
  p_agreement
  form_20
  form_1
  form_15
  association
  statement_bank
  is_approve = false
  steper_hide = false


  fifthForm: FormGroup;
  onFifthSubmit
  files
  uploadFile
  personalInfoForm: FormGroup;
  businessDetailsForm: FormGroup;
  settlementAccountForm: FormGroup;
  addShareholdereForm: FormGroup;
  addDirectorForm: FormGroup;

  is_loading = false
  waiting = true
  status_reg
  ipg_charge=""

  phone_number_format = "+94"
  phone_number_format2 = "+94"
  phone_number_format_shareholder= "+94"
  phone_number_format_director = "+94"
  item1
  item2
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

  userMessage

  image_lenth
  image_lenth_nic
  image_lenth_director
  image_length_nic_director

  basic_data = []

  partnership_types = ['Propertior', 'Partner', 'Director']
  pep_list = [true, false]
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

  business_categorys = []
  business_types = []
  get_all_bank = []
  package_details
  package_budget_details

  send_email
  agreement_open_model


  public saveUsername: boolean;

  constructor(private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastr: ToastrComponent,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getBusinessCategory()
    this.getBusinessType()
    this.getBank()
    this.getPackageDetailsById()


    this.personalInfoForm = this.fb.group({
      title: ['', Validators.required],
      gender: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: [''],
      nic: ['', [Validators.required, Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{12})$')]],
      contact_email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      designation: [''],
      contact_phone_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^(?:\\+94)[0-9]{9}$')]],
      dob: [''],
      address: ['', Validators.required],
      city: [''],
      postal_code: ['',[Validators.required,Validators.pattern('^(\\d*\.)?\\d+$')]],
      identification: ['', Validators.required],
      monthly_income: ['', Validators.required],
      wealth_generate: ['', Validators.required],
      image_front_side: ['', Validators.required],
      image_back_side: ['',],
      logo: ['', Validators.required]

    });
    this.businessDetailsForm = this.fb.group({
      business_type: ['', Validators.required],
      business_category: ['', Validators.required],
      register_number: [''],
      trading_name: ['', Validators.required],
      registered_business_name: [''],
      principal_place: ['', Validators.required],
      correspondence_address: ['', Validators.required],
      city_b_details: ['', Validators.required],
      postal_code_b_details: ['',[Validators.required,Validators.pattern('^(\\d*\.)?\\d+$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^(?:\\+94)[0-9]{9}$')]],
      business_website: [''],
      date_of_registration: ['', Validators.required],
      merchant_agreement_date: ['', Validators.required],
      income_tax_file_no: [''],
      nature_of_business: ['', Validators.required],
      facebook_page: [''],
      instagrame: ['',],
      filePq: ['',],
      fileGS: ['',],
      fileFT: ['',],
      fileMM: ['',],
      fileCM: ['',],
      fileBR: ['',],
      fileApplication: ['',],
      fileFrom1: ['',],
      fileFrom20: ['',],
      fileFrom15: ['',],
      fileArticles: ['',],

    });
    this.settlementAccountForm = this.fb.group({
      account_holder_name: ['', Validators.required],
      account_number: ['',[Validators.required,Validators.pattern('^(\\d*\.)?\\d+$')]],
      bank: ['', Validators.required],
      branch: ['', Validators.required],
      aggregate_conditions: ['', Validators.required],
      bk_statement: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.addShareholdereForm = this.fb.group({
      shareholder: this.fb.array([], Validators.required)
    });
    this.addDirectorForm = this.fb.group({
      merchant_business_owners: this.fb.array([], Validators.required)
    });

    setTimeout(() => {                           //<<<---using ()=> syntax
      this.addDirector()
      this.addShareholder()
    }, 100);

    this.chooseBtype('Individual')

  }


  choose(event) {

    if (event === 'NIC') {
      this.item1 = true
      this.item2 = true
      this.onAddValidationClick()
      this.resetIdintification()

    } else if (event === 'Passport') {
      this.item1 = true
      this.item2 = false
      this.onRemoveValidationClick()
      this.personalInfoFormreset()
      this.resetIdintification()
    }
    else if (event === 'Driving License') {
      this.item1 = true
      this.item2 = true
      this.onAddValidationClick()
      this.resetIdintification()
    }
    console.log('gg', event)
  }
  resetIdintification() {
    this.front_side = ""
    this.back_side = ""
    this.identification_back = ""
    this.personalInfoForm.get('image_front_side').reset()
  }
  
  // choose business type
  chooseBtype(event) {
    console.log(event)
    if (event === 'Sole Proprietorship') {
      this.itemDirector = true
      this.itemShareholder = false
      this.itemBusinessNumber = true
      this.itemBusinessName = false
      this.itemindividual = false
      this.itempartnership = false
      this.itemClub = false
      this.itemPartnershipname = true
      this.partnership_types = ['Proprietor']
      this.onRemoveValidationClickIndividual()
      this.businessDetailsFormresetIndividual()
      this.onRemoveValidationClickSociety()
      this.businessDetailsFormresetSociety()
      this.businessDetailsFormresetOther()
      this.onAddValidationClickBusinessnumber()
      this.onAddValidationClickBusinessname()
      this.solo_dissabled = true
      this.resetDirectorForm()
      this.resetShareholderForm()
      this.businessDetailsForm.controls.registered_business_name.reset()
      this.businessDetailsForm.controls.trading_name.reset()
      this.businessDetailsForm.controls.registered_business_name.enable()
      this.businessDetailsForm.controls.trading_name.enable()
      this.onAddValidationClickBR()
      this.onRemoveValidationClickPAgreement()
      this.onRemoveValidationClickfAssociation()
      this.onRemoveValidationClickSelectForm1()
      this.onRemoveValidationClickform20()
      this.onRemoveValidationClickform15()
      this.itemBR = true
      this.itemAgreement = false
      this.itemAssociation = false
      this.partnershipType = false
      this.resetFile()
    }
    else if (event === 'Partnership') {
      this.itemShareholder = true
      this.itemDirector = false
      this.itemBusinessNumber = true
      this.itempartnership = true
      this.itemBusinessName = false
      this.itemindividual = false
      this.itemClub = false
      this.itemPartnershipname = false
      this.partnershipType = true
      this.resetDirectorForm()
      this.resetShareholderForm()
      this.solo_dissabled = false
      this.onRemoveValidationClickIndividual()
      this.businessDetailsFormresetIndividual()
      this.onRemoveValidationClickSociety()
      this.businessDetailsFormresetSociety()
      this.businessDetailsFormresetOther()
      this.onAddValidationClickBusinessnumber()
      this.onAddValidationClickBusinessname()
      this.onRemoveValidationClickBusinessname()
      this.onRemoveValidationClickSelectForm1()
      this.onRemoveValidationClickform20()
      this.onRemoveValidationClickform15()
      this.resetDirectorForm()
      this.resetShareholderForm()
      this.businessDetailsForm.controls.registered_business_name.reset()
      this.businessDetailsForm.controls.trading_name.reset()
      this.businessDetailsForm.controls.registered_business_name.enable()
      this.businessDetailsForm.controls.trading_name.enable()
      this.onAddValidationClickBR()
      this.onAddValidationClickPAgreement()
      this.onRemoveValidationClickfAssociation()
      this.itemBR = true
      this.itemAgreement = true
      this.itemAssociation = false
      this.resetFile()
    }
    else if (event === 'Limited Liability') {
      this.itemShareholder = true
      this.itemDirector = true
      this.itemBusinessNumber = true
      this.itemBusinessName = false
      this.itemindividual = false
      this.itemClub = false
      this.itempartnership = true
      this.itemPartnershipname = false
      this.onRemoveValidationClickIndividual()
      this.businessDetailsFormresetIndividual()
      this.onRemoveValidationClickSociety()
      this.businessDetailsFormresetSociety()
      this.businessDetailsFormresetOther()
      this.onAddValidationClickBusinessnumber()
      this.onAddValidationClickBusinessname()
      this.resetDirectorForm()
      this.resetShareholderForm()
      this.solo_dissabled = false
      this.partnership_types = ['Director']
      this.businessDetailsForm.controls.registered_business_name.reset()
      this.businessDetailsForm.controls.trading_name.reset()
      this.businessDetailsForm.controls.registered_business_name.enable()
      this.businessDetailsForm.controls.trading_name.enable()
      this.onAddValidationClickBR()
      this.onRemoveValidationClickPAgreement()
      this.onAddValidationClickAssociation()
      this.onAddValidationClickSelectForm1()
      this.onRemoveValidationClickform20()
      this.onRemoveValidationClickform15()
      this.itemBR = true
      this.itemAgreement = false
      this.itemAssociation = true
      this.partnershipType = false
      this.resetFile()
    }
    else if (event === 'Clubs & Societies') {
      this.itemShareholder = false
      this.itemDirector = true
      this.itemBusinessNumber = false
      this.itemBusinessName = true
      this.itemindividual = false
      this.itemClub = true
      this.itempartnership = true
      this.itemPartnershipname = false
      this.onRemoveValidationClickIndividual()
      this.businessDetailsFormresetIndividual()
      this.onAddValidationClickSociety()
      this.businessDetailsFormresetSociety()
      this.businessDetailsFormresetOther()
      this.onRemoveValidationClickBusinessnumber()
      this.onRemoveValidationClickBusinessname()
      this.onRemoveValidationClickSelectForm1()
      this.resetDirectorForm()
      this.resetShareholderForm()
      this.solo_dissabled = false
      this.partnership_types = ['President', 'Secretary']
      this.businessDetailsForm.controls.registered_business_name.reset()
      this.businessDetailsForm.controls.trading_name.reset()
      this.businessDetailsForm.controls.registered_business_name.enable()
      this.businessDetailsForm.controls.trading_name.enable()
      this.onRemoveValidationClickBR()
      this.onRemoveValidationClickPAgreement()
      this.onRemoveValidationClickfAssociation()
      this.onRemoveValidationClickform20()
      this.onRemoveValidationClickform15()
      this.itemBR = false
      this.itemAgreement = false
      this.itemAssociation = false
      this.partnershipType = false
      this.resetFile()
    }

    else {
      this.itemDirector = false
      this.itemShareholder = false
      this.itemBusinessNumber = false
      this.itemBusinessName = false
      this.itemindividual = true
      this.itemClub = false
      this.itempartnership = true
      this.itemPartnershipname = false
      this.businessDetailsForm.controls.registered_business_name.setValue(this.personalInfoForm.value.first_name + " " + this.personalInfoForm.value.middle_name + " " + this.personalInfoForm.value.last_name);
      this.businessDetailsForm.controls.trading_name.setValue(this.personalInfoForm.value.first_name + " " + this.personalInfoForm.value.middle_name + " " + this.personalInfoForm.value.last_name);
      this.businessDetailsForm.controls.registered_business_name.disable();
      this.businessDetailsForm.controls.trading_name.disable();
      this.onAddValidationClickIndividual()
      this.businessDetailsFormresetIndividual()
      this.onRemoveValidationClickSociety()
      this.businessDetailsFormresetSociety()
      this.businessDetailsFormresetOther()
      this.onRemoveValidationClickBusinessnumber()
      this.onAddValidationClickBusinessname()
      this.resetDirectorForm()
      this.resetShareholderForm()
      this.onRemoveValidationClickBR()
      this.onRemoveValidationClickPAgreement()
      this.onRemoveValidationClickSelectForm1()
      this.onRemoveValidationClickform20()
      this.onRemoveValidationClickform15()
      this.itemBR = false
      this.itemAgreement = false
      this.itemAssociation = false
      this.partnershipType = false
      this.resetFile()
    }

  }
  resetFile() {
    this.p_qualification = ""
    this.gs = ""
    this.freelance = ""
    this.meeting_minute = ""
    this.committee_members = ""
    this.br = ""
    this.p_agreement = ""
    this.form_20 = ""
    this.form_1 = ""
    this.form_15 = ""
    this.association = ""
  }

  // director
  createEmpFormGroup() {
    return this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nic: ['', [Validators.required, Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{12})$')]],
      // pep: ['NO'],
      pep: ['', [Validators.required]],
      partnership: ['', [Validators.required]],
      income_level: ['', [Validators.required]],
      profile_image: ['', [Validators.required]],
      nic_front: ['', [Validators.required]],
      nic_back: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phone_number: ['', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
    })
  }

  get merchant_business_owners(): FormArray {
    try {
      return this.addDirectorForm.get('merchant_business_owners') as FormArray;

    } catch (ex) {
      console.log(ex)
    }
  }

  resetDirectorForm() {
    this.addDirectorForm.reset();

  }
  addDirector() {
    let fg = this.createEmpFormGroup();
    this.merchant_business_owners.push(fg);
  }
  deleteDirector(i: number) {
    this.merchant_business_owners.removeAt(i);

  }

  //shareholder
  createShareholderFormGroup() {
    return this.fb.group({
      name_shareholder: ['', [Validators.required]],
      address_shareholder: ['', [Validators.required]],
      percentage_shareholder: ['',[Validators.required,Validators.pattern('^(\\d*\.)?\\d+$')]],
      shareholder_pep: ['', [Validators.required,]],
      profile_image: ['', [Validators.required]],
      nic_front: ['', [Validators.required]],
      nic_back: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phone_number: ['', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
    })
  }

  get shareholder(): FormArray {
    try {
      return this.addShareholdereForm.get('shareholder') as FormArray;

    } catch (ex) {
      console.log(ex)
    }

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

  // file validation start
  checkvalidityPersonalInfo() {
    return !(this.personalInfoForm.valid)
  }
  checkvalidity(type) {
    if (type === 'Sole Proprietorship') {

      return !(this.addDirectorForm.valid && this.businessDetailsForm.valid && !(this.is_valid_po) && !(this.is_valid_email))

    }
    else if (type === 'Partnership') {
      return !(this.businessDetailsForm.valid && this.addShareholdereForm.valid && !(this.is_valid_po) && !(this.is_valid_email))

    }
    else if (type === 'Limited Liability') {
      return !(this.addDirectorForm.valid && this.businessDetailsForm.valid && this.addShareholdereForm.valid && !(this.is_valid_po) && !(this.is_valid_email))

    }
    else if (type === 'Clubs & Societies') {
      return !(this.addDirectorForm.valid && this.businessDetailsForm.valid && !(this.is_valid_po) && !(this.is_valid_email))
    }
    else {

      return !(this.businessDetailsForm.valid && !(this.is_valid_po) && !(this.is_valid_email))
    }
  }
  checkvaliditySetAccount() {
    return !(this.settlementAccountForm.valid && this.is_approve)
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
  submit_application() {
    let request = {

      // ...this.personalInfoForm.value,
      // ...this.addDirectorForm.value,
      // ...this.addShareholdereForm.value,
      // ...this.addShareholdereForm.value,

      "title": this.personalInfoForm.value["title"],
      "gender": this.personalInfoForm.value["gender"],
      "first_name": this.personalInfoForm.value["first_name"],
      "middle_name": (this.personalInfoForm.value["middle_name"]) ? (this.personalInfoForm.value["middle_name"]) : '',
      "last_name": (this.personalInfoForm.value["last_name"]) ? (this.personalInfoForm.value["last_name"]) : '',
      "nic": this.personalInfoForm.value["nic"],
      "contact_email": this.personalInfoForm.value["contact_email"],
      "designation": (this.personalInfoForm.value["designation"]) ? (this.personalInfoForm.value["designation"]) : '',
      "contact_phone_no": this.personalInfoForm.value["contact_phone_no"],
      "dob": (this.personalInfoForm.value["dob"]) ? (this.formatDate(this.personalInfoForm.value["dob"])) : '',
      "address": this.personalInfoForm.value["address"],
      "city": (this.personalInfoForm.value["city"]) ? (this.personalInfoForm.value["city"]) : '',
      "postal_code": this.personalInfoForm.value["postal_code"],
      "identification": this.personalInfoForm.value["identification"],
      "monthly_income": this.personalInfoForm.value["monthly_income"],
      "wealth_generate": this.personalInfoForm.value["wealth_generate"],
      "logo": this.personalInfoForm.value["logo"],

      "business_category": this.businessDetailsForm.value["business_category"],

      "business_type": this.businessDetailsForm.value["business_type"],
      // "business_type": 3,
      "trading_name": this.businessDetailsForm.get('trading_name').value ? this.businessDetailsForm.get('trading_name').value : '',
      "principal_place": this.businessDetailsForm.value["principal_place"],
      "correspondence_address": this.businessDetailsForm.value["correspondence_address"],
      "city_b_details": this.businessDetailsForm.value["city_b_details"],
      "postal_code_b_details": this.businessDetailsForm.value["postal_code_b_details"],
      "email": this.businessDetailsForm.value["email"],
      "phone_number": this.businessDetailsForm.value["phone_number"],
      "business_website": this.businessDetailsForm.value["business_website"] ? this.businessDetailsForm.value["business_website"] : '',
      "date_of_registration": this.formatDate(this.businessDetailsForm.value["date_of_registration"]),
      "merchant_agreement_date": this.formatDate(this.businessDetailsForm.value["merchant_agreement_date"]),
      "nature_of_business": this.businessDetailsForm.value["nature_of_business"],
      "facebook_page": this.businessDetailsForm.value["facebook_page"] ? this.businessDetailsForm.value["facebook_page"] : '',
      "instagrame": this.businessDetailsForm.value["instagrame"] ? this.businessDetailsForm.value["instagrame"] : '',
      "income_tax_file_no": this.businessDetailsForm.value["income_tax_file_no"] ? this.businessDetailsForm.value["income_tax_file_no"] : '',
      "account_details": {
        "account_holder_name": this.settlementAccountForm.value["account_holder_name"],
        "account_no": this.settlementAccountForm.value["account_number"],
        "bank_id": this.settlementAccountForm.value["bank"],
        "branch": this.settlementAccountForm.value["branch"],
        "type": this.settlementAccountForm.value["type"],
      },
      "aggregate_conditions": this.settlementAccountForm.value["aggregate_conditions"],
      "package_id": this.route.snapshot.queryParams && this.route.snapshot.queryParams['id'] ? this.route.snapshot.queryParams && this.route.snapshot.queryParams['id'] : 1,
    }

    if (((this.businessDetailsForm.get('business_type').value) === 'Individual') && (((this.personalInfoForm.get('identification').value) === 'NIC') || ((this.personalInfoForm.get('identification').value) === 'Driving License')) && (this.businessDetailsForm.get('fileFT').value)) {

      request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('filePq').value,
            type: 'filePQ'
          },
          {
            name: this.businessDetailsForm.get('fileGS').value,
            type: 'fileGS'
          },
          {
            name: this.businessDetailsForm.get('fileFT').value,
            type: 'filePTH'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          },
          {
            name: this.personalInfoForm.get('image_back_side').value,
            type: 'filePBS'
          },

        ]

    }
    else if (((this.businessDetailsForm.get('business_type').value) === 'Individual') && (((this.personalInfoForm.get('identification').value) === 'NIC') || ((this.personalInfoForm.get('identification').value) === 'Driving License')) && !(this.businessDetailsForm.get('fileFT').value)) {
      request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('filePq').value,
            type: 'filePQ'
          },
          {
            name: this.businessDetailsForm.get('fileGS').value,
            type: 'fileGS'
          },

          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          },
          {
            name: this.personalInfoForm.get('image_back_side').value,
            type: 'filePBS'
          },

        ]
    }
    else if (((this.businessDetailsForm.get('business_type').value) === 'Individual') && ((this.personalInfoForm.get('identification').value) === 'Passport') && (this.businessDetailsForm.get('fileFT').value)) {

      request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('filePq').value,
            type: 'filePQ'
          },
          {
            name: this.businessDetailsForm.get('fileGS').value,
            type: 'fileGS'
          },
          {
            name: this.businessDetailsForm.get('fileFT').value,
            type: 'filePTH'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          },

        ]

    }
    else if (((this.businessDetailsForm.get('business_type').value) === 'Individual') && ((this.personalInfoForm.get('identification').value) === 'Passport') && !(this.businessDetailsForm.get('fileFT').value)) {

      request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('filePq').value,
            type: 'filePQ'
          },
          {
            name: this.businessDetailsForm.get('fileGS').value,
            type: 'fileGS'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          },

        ]
    }

    else if (((this.businessDetailsForm.get('business_type').value) === 'Sole Proprietorship') && (((this.personalInfoForm.get('identification').value) === 'NIC') || ((this.personalInfoForm.get('identification').value) === 'Driving License'))) {
      request["merchant_business_owners"] = this.addDirectorForm.get('merchant_business_owners').value as FormArray;
      request["register_number"] = this.businessDetailsForm.get('register_number').value,
        request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,


        request['files'] = [
          {
            name: this.businessDetailsForm.get('fileBR').value,
            type: 'fileBR'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          },
          {
            name: this.personalInfoForm.get('image_back_side').value,
            type: 'filePBS'
          },

        ]


    }
    else if (((this.businessDetailsForm.get('business_type').value) === 'Sole Proprietorship') && ((this.personalInfoForm.get('identification').value) === 'Passport')) {
      request["merchant_business_owners"] = this.addDirectorForm.get('merchant_business_owners').value as FormArray;
      request["register_number"] = this.businessDetailsForm.get('register_number').value,
        request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('fileBR').value,
            type: 'fileBR'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          }


        ]
    }
    else if ((this.businessDetailsForm.get('business_type').value) === 'Limited Liability' && this.itemform1 === false && (((this.personalInfoForm.get('identification').value) === 'NIC') || ((this.personalInfoForm.get('identification').value) === 'Driving License'))) {
      request["merchant_business_owners"] = this.addDirectorForm.get('merchant_business_owners').value as FormArray;
      request["shareholder"] = this.addShareholdereForm.get('shareholder').value as FormArray;
      request["register_number"] = this.businessDetailsForm.get('register_number').value,
        request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('fileBR').value,
            type: 'fileBR'
          },
          {
            name: this.businessDetailsForm.get('fileFrom1').value,
            type: 'fileFrom1'
          },
          {
            name: this.businessDetailsForm.get('fileArticles').value,
            type: 'fileArticles'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },

          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          },
          {
            name: this.personalInfoForm.get('image_back_side').value,
            type: 'filePBS'
          },
        ]

    }
    else if ((this.businessDetailsForm.get('business_type').value) === 'Limited Liability' && this.itemform1 === false && ((this.personalInfoForm.get('identification').value) === 'Passport')) {
      request["merchant_business_owners"] = this.addDirectorForm.get('merchant_business_owners').value as FormArray;
      request["shareholder"] = this.addShareholdereForm.get('shareholder').value as FormArray;
      request["register_number"] = this.businessDetailsForm.get('register_number').value,
        request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('fileBR').value,
            type: 'fileBR'
          },
          {
            name: this.businessDetailsForm.get('fileFrom1').value,
            type: 'fileFrom1'
          },
          {
            name: this.businessDetailsForm.get('fileArticles').value,
            type: 'fileArticles'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          }
        ]
    }

    else if ((this.businessDetailsForm.get('business_type').value) === 'Limited Liability' && this.itemform1 === true && (((this.personalInfoForm.get('identification').value) === 'NIC') || ((this.personalInfoForm.get('identification').value) === 'Driving License'))) {
      request["merchant_business_owners"] = this.addDirectorForm.get('merchant_business_owners').value as FormArray;
      request["shareholder"] = this.addShareholdereForm.get('shareholder').value as FormArray;
      request["register_number"] = this.businessDetailsForm.get('register_number').value,
        request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('fileBR').value,
            type: 'fileBR'
          },
          {
            name: this.businessDetailsForm.get('fileFrom15').value,
            type: 'fileFrom15'
          },
          {
            name: this.businessDetailsForm.get('fileFrom20').value,
            type: 'fileFrom20'
          },
          {
            name: this.businessDetailsForm.get('fileArticles').value,
            type: 'fileArticles'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          },
          {
            name: this.personalInfoForm.get('image_back_side').value,
            type: 'filePBS'
          },

        ]


    }
    else if ((this.businessDetailsForm.get('business_type').value) === 'Limited Liability' && this.itemform1 === true && ((this.personalInfoForm.get('identification').value) === 'Passport')) {
      request["merchant_business_owners"] = this.addDirectorForm.get('merchant_business_owners').value as FormArray;
      request["shareholder"] = this.addShareholdereForm.get('shareholder').value as FormArray;
      request["register_number"] = this.businessDetailsForm.get('register_number').value,
        request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('fileBR').value,
            type: 'fileBR'
          },
          {
            name: this.businessDetailsForm.get('fileFrom15').value,
            type: 'fileFrom15'
          },
          {
            name: this.businessDetailsForm.get('fileFrom20').value,
            type: 'fileFrom20'
          },
          {
            name: this.businessDetailsForm.get('fileArticles').value,
            type: 'fileArticles'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          }
        ]
    }

    else if ((this.businessDetailsForm.get('business_type').value) === 'Partnership' && (((this.personalInfoForm.get('identification').value) === 'NIC') || ((this.personalInfoForm.get('identification').value) === 'Driving License'))) {

      request["shareholder"] = this.addShareholdereForm.get('shareholder').value as FormArray;
      request["register_number"] = this.businessDetailsForm.get('register_number').value,
        request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('fileBR').value,
            type: 'fileBR'
          },
          {
            name: this.businessDetailsForm.get('fileApplication').value,
            type: 'fileApplication'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          },
          {
            name: this.personalInfoForm.get('image_back_side').value,
            type: 'filePBS'
          },

        ]
    }
    else if ((this.businessDetailsForm.get('business_type').value) === 'Partnership' && ((this.personalInfoForm.get('identification').value) === 'Passport')) {
      request["shareholder"] = this.addShareholdereForm.get('shareholder').value as FormArray;
      request["register_number"] = this.businessDetailsForm.get('register_number').value,
        request["registered_business_name"] = this.businessDetailsForm.get('registered_business_name').value,
        request['files'] = [
          {
            name: this.businessDetailsForm.get('fileBR').value,
            type: 'fileBR'
          },
          {
            name: this.businessDetailsForm.get('fileApplication').value,
            type: 'fileApplication'
          },
          {
            name: this.settlementAccountForm.get('bk_statement').value,
            type: 'fileST'
          },
          {
            name: this.personalInfoForm.get('image_front_side').value,
            type: 'filePFS'
          }
        ]

    }
    else if ((this.businessDetailsForm.get('business_type').value) === 'Clubs & Societies' && (((this.personalInfoForm.get('identification').value) === 'NIC') || ((this.personalInfoForm.get('identification').value) === 'Driving License'))) {
      request["merchant_business_owners"] = this.addDirectorForm.get('merchant_business_owners').value as FormArray;

      request['files'] = [
        {
          name: this.businessDetailsForm.get('fileMM').value,
          type: 'fileMM'
        },
        {
          name: this.businessDetailsForm.get('fileCM').value,
          type: 'fileCM'
        },
        {
          name: this.settlementAccountForm.get('bk_statement').value,
          type: 'fileST'
        },
        {
          name: this.personalInfoForm.get('image_front_side').value,
          type: 'filePFS'
        },
        {
          name: this.personalInfoForm.get('image_back_side').value,
          type: 'filePBS'
        },

      ]

    }
    else if ((this.businessDetailsForm.get('business_type').value) === 'Clubs & Societies' && ((this.personalInfoForm.get('identification').value) === 'Passport')) {

      request["merchant_business_owners"] = this.addDirectorForm.get('merchant_business_owners').value as FormArray;
      request['files'] = [
        {
          name: this.businessDetailsForm.get('fileMM').value,
          type: 'fileMM'
        },
        {
          name: this.businessDetailsForm.get('fileCM').value,
          type: 'fileCM'
        },
        {
          name: this.settlementAccountForm.get('bk_statement').value,
          type: 'fileST'
        },
        {
          name: this.personalInfoForm.get('image_front_side').value,
          type: 'filePFS'
        }


      ]
    }
    let b_cat_details = this.business_types.find(type => type.type == this.businessDetailsForm.value['business_type']);
    request['business_type'] = b_cat_details['id']


    console.log(request, 'testing basic')
    this.loadingModel.show()

    this.userService.self_register_merchant(request).then(res => {
      this.waiting = true
      this.is_loading = true
      if (res['status'] == 100) {
        this.loadingModel.hide()

        this.send_email = res['data']
        this.toastr.showToast('success', 'success', 'You have successfully registered'),
          this.addShareholdereForm.reset(),
          this.addDirectorForm.reset(),
          this.personalInfoForm.reset(),
          this.businessDetailsForm.reset(),
          this.settlementAccountForm.reset(),
          this.resetFile()
          this.resetIdintification()
          this.is_loading = false
          this.steper_hide = true
        this.waiting = false
        this.status_reg = true
      } else {
        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
        this.is_loading = false
        this.waiting = false
        this.status_reg = false
        this.loadingModel.hide()
      }
    }, error => {
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
      this.is_loading = false
      this.waiting = false
      this.status_reg = false
      this.loadingModel.hide()
    })
  }
  // image shareholder/director upload///////////////////////////////////////////////////////////////////
  async onFileChange(event, i: number, key, atribute) {

    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (key == 'shreholder') {
          let taskListArrays = this.addShareholdereForm.get('shareholder') as FormArray;

          taskListArrays.controls[i].patchValue({ [atribute]: reader.result })

        }
        else if (key == 'merchant_owners') {
          let taskListArrays = this.addDirectorForm.get('merchant_business_owners') as FormArray;

          taskListArrays.controls[i].patchValue({ [atribute]: reader.result })


        }
        this.cd.markForCheck();

      };
    }
  }


  // other image upload
  async onFileChangeImage(event, key) {

    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;


      reader.readAsDataURL(file);
      reader.onload = () => {
        if (key == 'identification_front') {
          this.personalInfoForm.get('image_front_side').setValue(reader.result);
          this.front_side = file.name
        }
        else if (key == 'identification_back_side') {

          this.identification_back = reader.result
          this.personalInfoForm.get('image_back_side').setValue(reader.result);
          this.back_side = file.name
        }
        else if (key == 'user_image') {
          this.personalInfoForm.get('logo').setValue(reader.result);
          this.logo = file.name

        }
        else if (key == 'perofessional_q') {
          this.perofessional_qualification = reader.result
          this.businessDetailsForm.get('filePq').setValue(reader.result);
          this.p_qualification = file.name
        }
        else if (key == 'income_certificate') {
          this.income_certificate_gs = reader.result
          this.businessDetailsForm.get('fileGS').setValue(reader.result);
          this.gs = file.name
        }
        else if (key == 'freelance_transaction') {
          this.transaction_freelance = reader.result
          this.businessDetailsForm.get('fileFT').setValue(reader.result);
          this.freelance = file.name
        }
        else if (key == 'club_meeting_minute') {
          this.club_meeting = reader.result
          this.businessDetailsForm.get('fileMM').setValue(reader.result);
          this.meeting_minute = file.name
        }
        else if (key == 'club_committee_members') {
          this.club_members = reader.result
          this.businessDetailsForm.get('fileCM').setValue(reader.result);
          this.committee_members = file.name
        }

        else if (key == 'business_register') {
          this.business_register_file = reader.result
          this.businessDetailsForm.get('fileBR').setValue(reader.result);
          this.br = file.name
        }
        else if (key == 'partneship_agreement') {
          this.partnership_agree = reader.result
          this.businessDetailsForm.get('fileApplication').setValue(reader.result);
          this.p_agreement = file.name
        }
        else if (key == 'form_20') {
          this.form_20_length = reader.result
          this.businessDetailsForm.get('fileFrom20').setValue(reader.result);
          this.form_20 = file.name
        }
        else if (key == 'form_1') {
          this.form_1_length = reader.result
          this.businessDetailsForm.get('fileFrom1').setValue(reader.result);
          this.form_1 = file.name
        }
        else if (key == 'form_15') {
          this.form_15_length = reader.result
          this.businessDetailsForm.get('fileFrom15').setValue(reader.result);
          this.form_15 = file.name
        }
        else if (key == 'articles_of_association') {
          this.articles_association = reader.result
          this.businessDetailsForm.get('fileArticles').setValue(reader.result);
          this.association = file.name
        }

        else if (key == 'bank_statement') {
          this.settlementAccountForm.get('bk_statement').setValue(reader.result);
          this.statement_bank = file.name
        }
        this.cd.markForCheck();

      };
    }
  }
  //change form
  public onSaveUsernameChanged(value: boolean) {

    this.saveUsername = value;
    if (this.saveUsername === true) {

      this.itemform1 = true
      this.onRemoveValidationClickSelectForm1()
      this.onAddValidationClickForm20()
      this.onAddValidationClickForm15()
    }
    else {
      this.itemform1 = false
      this.onAddValidationClickSelectForm1()
      this.onRemoveValidationClickform20()
      this.onRemoveValidationClickform15()
    }
  }


  //////////////////////////////////////////////////////////////////////////////////personalInfoForm
  onAddValidationClick() {
    this.personalInfoForm.controls["image_back_side"].setValidators(Validators.required);
    this.personalInfoForm.controls["image_back_side"].updateValueAndValidity();
  }

  onRemoveValidationClick() {
    this.personalInfoForm.controls["image_back_side"].clearValidators();
    this.personalInfoForm.controls["image_back_side"].updateValueAndValidity();
  }

  //form reset
  personalInfoFormreset() {
    this.personalInfoForm.get('image_front_side').reset()
    this.personalInfoForm.get('image_back_side').reset()
    this.identification_back = ""
  }
  //////////////////////////////////////////////////////////////////////////////////////businessDetailsForm
  //individual
  onAddValidationClickIndividual() {
    this.businessDetailsForm.controls["filePq"].setValidators(Validators.required);
    this.businessDetailsForm.controls["filePq"].updateValueAndValidity();

    this.businessDetailsForm.controls["fileGS"].setValidators(Validators.required);
    this.businessDetailsForm.controls["fileGS"].updateValueAndValidity();
  }

  onRemoveValidationClickIndividual() {
    this.businessDetailsForm.controls["filePq"].clearValidators();
    this.businessDetailsForm.controls["filePq"].updateValueAndValidity();

    this.businessDetailsForm.controls["fileGS"].clearValidators();
    this.businessDetailsForm.controls["fileGS"].updateValueAndValidity();
  }
  //form reset-Individual
  businessDetailsFormresetIndividual() {
    this.businessDetailsForm.get('filePq').reset()
    this.businessDetailsForm.get('fileGS').reset()
    this.businessDetailsForm.get('fileFT').reset()
    this.perofessional_qualification = ""
    this.income_certificate_gs = ""
    this.transaction_freelance = ""
  }
  //club and society
  onAddValidationClickSociety() {
    this.businessDetailsForm.controls["fileMM"].setValidators(Validators.required);
    this.businessDetailsForm.controls["fileMM"].updateValueAndValidity();

    this.businessDetailsForm.controls["fileCM"].setValidators(Validators.required);
    this.businessDetailsForm.controls["fileCM"].updateValueAndValidity();
  }

  onRemoveValidationClickSociety() {
    this.businessDetailsForm.controls["fileMM"].clearValidators();
    this.businessDetailsForm.controls["fileMM"].updateValueAndValidity();

    this.businessDetailsForm.controls["fileCM"].clearValidators();
    this.businessDetailsForm.controls["fileCM"].updateValueAndValidity();
  }
  businessDetailsFormresetSociety() {
    this.businessDetailsForm.get('fileMM').reset()
    this.businessDetailsForm.get('fileCM').reset()
    this.club_meeting = ""
    this.club_members = ""
  }

  //BR
  onAddValidationClickBR() {
    this.businessDetailsForm.controls["fileBR"].setValidators(Validators.required);
    this.businessDetailsForm.controls["fileBR"].updateValueAndValidity();
  }
  onRemoveValidationClickBR() {
    this.businessDetailsForm.controls["fileBR"].clearValidators();
    this.businessDetailsForm.controls["fileBR"].updateValueAndValidity();
  }
  //partnership agreement
  onAddValidationClickPAgreement() {
    this.businessDetailsForm.controls["fileApplication"].setValidators(Validators.required);
    this.businessDetailsForm.controls["fileApplication"].updateValueAndValidity();
  }
  onRemoveValidationClickPAgreement() {
    this.businessDetailsForm.controls["fileApplication"].clearValidators();
    this.businessDetailsForm.controls["fileApplication"].updateValueAndValidity();
  }
  //Application
  onAddValidationClickForm1() {
    this.businessDetailsForm.controls["fileApplication"].setValidators(Validators.required);
    this.businessDetailsForm.controls["fileApplication"].updateValueAndValidity();
  }
  onRemoveValidationClickform1() {
    this.businessDetailsForm.controls["fileApplication"].clearValidators();
    this.businessDetailsForm.controls["fileApplication"].updateValueAndValidity();
  }
  //form20
  onAddValidationClickForm20() {
    this.businessDetailsForm.controls["fileFrom20"].setValidators(Validators.required);
    this.businessDetailsForm.controls["fileFrom20"].updateValueAndValidity();
  }
  onRemoveValidationClickform20() {
    this.businessDetailsForm.controls["fileFrom20"].clearValidators();
    this.businessDetailsForm.controls["fileFrom20"].updateValueAndValidity();
  }
  //from15
  onAddValidationClickForm15() {
    this.businessDetailsForm.controls["fileFrom15"].setValidators(Validators.required);
    this.businessDetailsForm.controls["fileFrom15"].updateValueAndValidity();

  }
  onRemoveValidationClickform15() {

    this.businessDetailsForm.controls["fileFrom15"].clearValidators();
    this.businessDetailsForm.controls["fileFrom15"].updateValueAndValidity();
  }
  //artical of assocoation
  onAddValidationClickAssociation() {
    this.businessDetailsForm.controls["fileArticles"].setValidators(Validators.required);
    this.businessDetailsForm.controls["fileArticles"].updateValueAndValidity();
  }
  onRemoveValidationClickfAssociation() {

    this.businessDetailsForm.controls["fileArticles"].clearValidators();
    this.businessDetailsForm.controls["fileArticles"].updateValueAndValidity();
  }
  //form 1
  onAddValidationClickSelectForm1() {
    this.businessDetailsForm.controls["fileFrom1"].setValidators(Validators.required);
    this.businessDetailsForm.controls["fileFrom1"].updateValueAndValidity();
  }
  onRemoveValidationClickSelectForm1() {

    this.businessDetailsForm.controls["fileFrom1"].clearValidators();
    this.businessDetailsForm.controls["fileFrom1"].updateValueAndValidity();
  }

  businessDetailsFormresetOther() {
    this.businessDetailsForm.get('fileBR').reset()
    this.businessDetailsForm.get('fileApplication').reset()
    this.businessDetailsForm.get('fileFrom20').reset()
    this.businessDetailsForm.get('fileFrom15').reset()
    this.businessDetailsForm.get('fileArticles').reset()
    this.businessDetailsForm.get('fileFrom1').reset()
    this.business_register_file = ""
    this.partnership_agree = ""
    this.form_20_length = ""
    this.form_15_length = ""
    this.form_1_length = ""
    this.articles_association = ""

  }
  //////////////////////////////////////////////////////////Registed Business number
  onAddValidationClickBusinessnumber() {
    this.businessDetailsForm.controls["register_number"].setValidators(Validators.required);
    this.businessDetailsForm.controls["register_number"].updateValueAndValidity();
  }

  onRemoveValidationClickBusinessnumber() {
    this.businessDetailsForm.controls["register_number"].clearValidators();
    this.businessDetailsForm.controls["register_number"].updateValueAndValidity();
  }
  //////////////////////////////////////////////////////////Registed Business name
  onAddValidationClickBusinessname() {
    this.businessDetailsForm.controls["registered_business_name"].setValidators(Validators.required);
    this.businessDetailsForm.controls["registered_business_name"].updateValueAndValidity();
  }

  onRemoveValidationClickBusinessname() {
    this.businessDetailsForm.controls["registered_business_name"].clearValidators();
    this.businessDetailsForm.controls["registered_business_name"].updateValueAndValidity();
  }
  // getBusinessCategory
  getBusinessCategory() {
    this.userService.getBusinessCategoryUnautharized().then(
      res => {
        this.is_loading = false
        if (res['status'] == 100) {
          this.business_categorys = res['data'];
          console.log(this.business_categorys, 'business category')
        }
        else {
          this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }
  // getBusinessType
  getBusinessType() {
    this.userService.getBusinessTypeUnautharized().then(
      res => {
        this.is_loading = false
        if (res['status'] == 100) {
          this.business_types = res['data'];
          console.log(this.business_types, 'business type')
        }
        else {
          this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }
  // get bank
  getBank() {
    this.userService.getBankUnautharized().then(
      res => {
        this.is_loading = false
        if (res['status'] == 100) {
          this.get_all_bank = res['data'];
          console.log(res['data'], 'get bank')
        }
        else {
          this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }
  // validation-duplicate phone number
  is_valid_po = false
  duplicatePhoneNumber() {
    let request = {
      "phone_number": this.phone_number_format2
    }
    console.log(request)
    this.userService.duplicat_phone_number(request).then(res => {

      if (res['status'] == 100) {
        if (res['data']) {
          this.is_valid_po = true
        } else {
          this.is_valid_po = false
        }
      } else {
        this.is_valid_po = false
      }
    })
  }

  // validation-duplicate email
  is_valid_email = false
  duplicateEmal() {
    let request = {
      "email": this.businessDetailsForm.get('email').value
    }

    this.userService.duplicat_email(request).then(res => {

      if (res['status'] == 100) {
        if (res['data']) {
          this.is_valid_email = true
        } else {
          this.is_valid_email = false
        }
      } else {
        this.is_valid_email = false
      }
    })
  }
  // get package details
  getPackageDetailsById() {
    this.userService.getPackageDetails(this.route.snapshot.queryParams && this.route.snapshot.queryParams['id']).then(
      res => {
        this.is_loading = false
        if (res['status'] == 100) {
          this.package_details = res['data'];
          this.package_budget_details = res['data']['package_budget_data'][0];
          console.log(this.package_details, 'package_details')
          if(this.package_details['name']=="Standard"){
            this.ipg_charge="(Payment processing fee is 3.60%)"
          }else if(this.package_details['name']=="Essential"){
            this.ipg_charge="(Payment processing fee is 3.25%)"
          }else if(this.package_details['name']=="Elevate"){
            this.ipg_charge="(Payment processing fee is 2.75%)"
          }else if(this.package_details['name']=="Premier"){
            this.ipg_charge="(Payment processing fee is 2.5%)"
          }else{
            this.ipg_charge=""
          }

        }
        else {
          this.userMessage = res['message']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }

  openAgreement(dialogAgreement: TemplateRef<any>) {

    this.agreement_open_model = this.dialogService.open(dialogAgreement, { closeOnBackdropClick: false });
  }
  trueAgreement() {
    this.agreement_open_model.close()
    this.settlementAccountForm.controls['aggregate_conditions'].setValue(true);

  }
  close() {
    this.settlementAccountForm.controls['aggregate_conditions'].setValue(false);
    this.agreement_open_model.close()
    this.settlementAccountForm.get('aggregate_conditions').value.reset()

  }





}
