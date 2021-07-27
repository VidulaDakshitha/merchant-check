import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from '../../../@core/services/user.service';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@theme/components';
import { PdfExportService } from '../../../@core/services/pdf-export.service'

@Component({
  selector: 'ngx-register-merchant',
  templateUrl: './register-merchant.component.html',
  styleUrls: ['./register-merchant.component.scss']
})
export class RegisterMerchantComponent implements OnInit {
  p: number = 1;
  total: number = 0;
  pageSize: number = 10;
  userMessage
  merchant_details = [] = []
  search_by = 0
  id
  merchant
  registered_business_name
  register_number
  email
  phone_number
  search_text
  selected_merchant = {}
  is_loading = false

  deleteMerchantForm: FormGroup;
  emailUpdateMerchantForm: FormGroup;
  delete_merchant_model
  update_model_email

  constructor(
    private pdfExportService: PdfExportService,
    private dialogService: NbDialogService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrComponent

  ) {
    this.deleteMerchantForm = this.fb.group({
      merchant_id: ['', Validators.required],

    });
    this.emailUpdateMerchantForm = this.fb.group({
      user_id: ['', Validators.required],
      new_email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],

    });
  }

  ngOnInit() {
    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }

    this.pageChangedMerchant(1)
  }
  search_data() {
    console.log(this.search_by)
    this.getMerchantData(1, this.pageSize);

  }

  changeSearchType() {
    this.search_text = ''
    if (this.search_by == 0) {
      this.getMerchantData(1, this.pageSize)
    }
  }

  pageChangedMerchant(newPage: any) {
    console.log('merchant')
    this.p = newPage
    this.getMerchantData(this.p, this.pageSize);
  }

  //merchant Details
  getMerchantData(p, pageSize) {
    this.is_loading = true
    console.log('merchantall')
    this.merchant_details = [] = []
    if (this.search_by == 0) {

      this.userService.getMerchantAll(p, pageSize).then(
        res => {
          this.is_loading = false
          console.log('merchant', res['data'])
          if (res['success']) {

            this.merchant_details = res['data']['merchant'];
            this.total = res['data']['count'];
          }
          else {

            this.userMessage = res['description']
            this.toastr.showToast('danger', 'error', this.userMessage)
          }
        },
        err => {
          this.is_loading = false
          console.log(err);
          this.toastr.showToast('danger', 'error', 'Internal Server Error')
        }
      );


    } else if (this.search_by == 1) {
      this.is_loading = true
      if (this.search_text) {
        this.userService.getMerchantById(p, pageSize, this.search_text).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.merchant_details = res['data']['merchant'];
              this.total = res['data']['count'];
            }
            else {
              this.userMessage = res['description']
              this.toastr.showToast('danger', 'error', this.userMessage)
            }
          },
          err => {
            this.is_loading = false
            console.log(err);
            this.toastr.showToast('danger', 'error', 'Internal Server Error')
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
      }
    }
    else if (this.search_by == 2) {
      this.is_loading = true
      if (this.search_text) {
        this.userService.getMerchantByBusinessName(p, pageSize, this.search_text).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.is_loading = false
              this.merchant_details = res['data']['merchant'];
              this.total = res['data']['count'];
            }
            else {
              this.userMessage = res['description']
              this.toastr.showToast('danger', 'error', this.userMessage)
            }
          },
          err => {
            console.log(err);
            this.toastr.showToast('danger', 'error', 'Internal Server Error')
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
      }
    }
    else if (this.search_by == 3) {
      this.is_loading = true
      if (this.search_text) {
        this.userService.getMerchantByRegisterNumber(p, pageSize, this.search_text).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.merchant_details = res['data']['merchant'];
              this.total = res['data']['count'];
            }
            else {
              this.userMessage = res['description']
              this.toastr.showToast('danger', 'error', this.userMessage)
            }
          },
          err => {
            this.is_loading = false
            console.log(err);
            this.toastr.showToast('danger', 'error', 'Internal Server Error')
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
      }
    }
    else if (this.search_by == 4) {
      this.is_loading = true
      if (this.search_text) {
        this.userService.getMerchantByEmail(p, pageSize, this.search_text).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.merchant_details = res['data']['merchant'];
              this.total = res['data']['count'];
            }
            else {
              this.userMessage = res['description']
              this.toastr.showToast('danger', 'error', this.userMessage)
            }
          },
          err => {
            this.is_loading = false
            console.log(err);
            this.toastr.showToast('danger', 'error', 'Internal Server Error')
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
      }
    }
    else if (this.search_by == 5) {
      this.is_loading = true
      if (this.search_text) {
        this.userService.getMerchantByPhoneNumber(p, pageSize, this.search_text).then(
          res => {
            this.is_loading = false
            if (res['success']) {
              this.merchant_details = res['data']['merchant'];
              this.total = res['data']['count'];
            }
            else {
              this.userMessage = res['description']
              this.toastr.showToast('danger', 'error', this.userMessage)
            }
          },
          err => {
            this.is_loading = false
            console.log(err);
            this.toastr.showToast('danger', 'error', 'Internal Server Error')
          }
        );
      } else {
        this.is_loading = false
        this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
      }
    }
    else {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Incorrect search keyword')
    };

  }

  //merchant details view
  open3(dialog3: TemplateRef<any>, merchant) {
    this.selected_merchant = merchant
    console.log(this.selected_merchant)
    this.dialogService.open(
      dialog3);
  }

  // delete merchant
  openDeleteMerchant(dialogDeleteMerchant: TemplateRef<any>, merchant) {
    this.deleteMerchantForm.setValue({
      merchant_id: merchant.id,

    });
    this.delete_merchant_model = this.dialogService.open(dialogDeleteMerchant);
  }
  closeMerchantDelete() {
    this.deleteMerchantForm.reset()
    this.delete_merchant_model.close()
  }

  deleteMerchantData() {
    this.is_loading = true
    this.userService.deleteMerchantData(this.deleteMerchantForm.value.merchant_id).then(res => {
      console.log(res)
      if (res['success']) {
        this.is_loading = false
        this.toastr.showToast('success', 'success', 'Merchant Delete Success')
        this.delete_merchant_model.close()
        this.deleteMerchantForm.reset()
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

  //update admin email
  openUpdateMerchantEmail(dialogUpdateMerchantEmail: TemplateRef<any>, merchant) {
    this.emailUpdateMerchantForm.setValue({
      user_id: merchant.id,
      new_email: merchant.email,
    });
    this.update_model_email = this.dialogService.open(dialogUpdateMerchantEmail);
  }

  closeUpdateMerchantEmail() {
    this.emailUpdateMerchantForm.reset()
    this.update_model_email.close()
  }

  updateMerchantEmailData() {
    this.is_loading = true
    this.userService.updateMerchantEmailData(this.emailUpdateMerchantForm.value).then(res => {
      console.log(res)
      if (res['success']) {
        this.is_loading = false
        this.update_model_email.close()
        this.emailUpdateMerchantForm.reset()
        this.toastr.showToast('success', 'success', 'Merchant Update Success')
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

  /////////////////////////////////////////////////////////////////////////////// manual PDF download
  manualPDFData(merchant) {
    this.is_loading = true
    this.userService.getMerchantFullView(merchant.id).then(res => {
      console.log(res)
      if (res['success']) {
        let sample = {
          "service_provider_name": res['merchant'].service_provider_name ? res['merchant'].service_provider_name : '-', "service_provider_address": res['merchant'].service_provider_address ? res['merchant'].service_provider_address : '-', "service_provider_registration_no": res['merchant'].service_provider_registration_no ? res['merchant'].service_provider_registration_no : '-', "contact_person_name": res['merchant'].contact_person_name ? res['merchant'].contact_person_name : '-', "contact_person_designation": res['merchant'].contact_person_designation ? res['merchant'].contact_person_designation : '-', "contact_person_Number": res['merchant'].contact_person_Number ? res['merchant'].contact_person_Number : '-', "business_type": res['merchant'].business_type ? res['merchant'].business_type : '-', "business_category": res['merchant'].business_category ? res['merchant'].business_category : '-', "registered_business_name": res['merchant'].registered_business_name ? res['merchant'].registered_business_name : '-', "register_number": res['merchant'].register_number ? res['merchant'].register_number : '-', "tranding_name": res['merchant'].tranding_name ? res['merchant'].tranding_name : '-',
          "principal_place": res['merchant'].principal_place ? res['merchant'].principal_place : '-', "correspondence_address": res['merchant'].correspondence_address ? res['merchant'].correspondence_address : '-', "email": res['merchant'].email ? res['merchant'].email : '-', "phone_number": res['merchant'].phone_number ? res['merchant'].phone_number : '-', "nature_of_business": res['merchant'].nature_of_business ? res['merchant'].nature_of_business : '-', "income_tax": res['merchant'].income_tax ? res['merchant'].income_tax : '-', "date_of_registration": res['merchant'].date_of_registration ? res['merchant'].date_of_registration : '-', "account_holder_name": res['merchant'].account_holder_name ? res['merchant'].account_holder_name : '-'
          , "account_number": res['merchant'].account_number ? res['merchant'].account_number : '-', "bank": res['merchant'].bank ? res['merchant'].bank : '-', "bank_name": res['merchant'].bank_name ? res['merchant'].bank_name : '-', "b_cat_name": res['merchant'].business_category ? res['merchant'].business_category : '-', "b_type_name": res['merchant'].business_type ? res['merchant'].business_type : '-',
          "branch": res['merchant'].branch ? res['merchant'].branch : '-', "commission_rate_visa": res['merchant'].commission_rate_visa ? res['merchant'].commission_rate_visa : '-', "commission_rate_just_pay": res['merchant'].commission_rate_just_pay ? res['merchant'].commission_rate_just_pay : '-', "commission_rate_lanka_qr": res['merchant'].commission_rate_lanka_qr ? res['merchant'].commission_rate_lanka_qr : '-', "merchant_agreement_date": res['merchant'].merchant_agreement_date ? res['merchant'].merchant_agreement_date : '-',

          "director": [
          ],

          "shareholder": [],
          "files": [],
          "sub_type_list": [],
         

        }

        for (let a = 0; a < res['merchant']['share_holders'].length; a++) {
          sample['shareholder'].push(
            {
              "name_shareholder": res['merchant']['share_holders'][a]['name_shareholder'] ? res['merchant']['share_holders'][a]['name_shareholder'] : "",
              "address_shareholder": res['merchant']['share_holders'][a]['address_shareholder'] ? res['merchant']['share_holders'][a]['address_shareholder'] : "",
              "percentage_shareholder": res['merchant']['share_holders'][a]['percentage_shareholder'] ? res['merchant']['share_holders'][a]['percentage_shareholder'] : "",
              "shareholder_pep": res['merchant']['share_holders'][a]['shareholder_pep'] == "true" ? "Yes" : "No"
            }
          )
        }
        for (let a = 0; a < res['merchant']['directors'].length; a++) {
          sample['director'].push(
            {
              "name": res['merchant']['directors'][a]['name'] ? res['merchant']['directors'][a]['name'] : "",
              "address": res['merchant']['directors'][a]['address'] ? res['merchant']['directors'][a]['address'] : "",
              "nic": res['merchant']['directors'][a]['nic'] ? res['merchant']['directors'][a]['nic'] : "",
              "director_pep": res['merchant']['directors'][a]['director_pep'] == "true" ? "Yes" : "No"
            }
          )
        }
        for (let a = 0; a < res['merchant']['sub_type'].length; a++) {
          sample['sub_type_list'].push(
            {
              "subtype_id__subtype": res['merchant']['sub_type'][a]['subtype_id__subtype'] ? res['merchant']['sub_type'][a]['subtype_id__subtype'] : "",
            }
          )
        }

        this.pdfExportService.exportToPdf(sample)
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
  // emty PDF
  exportPDF() {
    let sample = { "service_provider_name": " ", "service_provider_address": " ", "service_provider_registration_no": " ", "contact_person_name": " ", "contact_person_designation": " ", "contact_person_Number": " ", "business_type": " ", "business_category": " ", "registered_business_name": " ", "register_number": " ", "tranding_name": " ", "principal_place": " ", "correspondence_address": " ", "email": " ", "phone_number": " ", "nature_of_business": " ", "income_tax": " ", "date_of_registration": " ", "account_holder_name": "ertrtyertr", "account_number": " ", "bank": " ", "bank_name": " ", "b_cat_name": " ", "b_type_name": " ", "branch": " ", "commission_rate_visa": " ", "commission_rate_just_pay": " ", "commission_rate_lanka_qr": " ", "merchant_agreement_date": " ", "director": [], "shareholder": [], "files": [], "sub_type_list": [] }

    this.pdfExportService.exportToPdf(sample)
  }

}
