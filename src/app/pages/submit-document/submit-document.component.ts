import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/services/user.service';
import { ToastrComponent } from '../../@theme/components';
import { environment } from '../../../environments/environment'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {EncriptionService} from '../../@core/services/encription.service'

@Component({
  selector: 'ngx-submit-document',
  templateUrl: './submit-document.component.html',
  styleUrls: ['./submit-document.component.scss']
})
export class SubmitDocumentComponent implements OnInit {
  local_bsiness_type = this.EncriptionService.response_decript(localStorage.getItem("opm_business_type"));
  is_loading = false
  pdf_merchant
  userMessage
  base64_file_array=[]
  files: any = [];
  file_new = []
  pdf_data = []
  image_base_path = environment.aws;
is_disable=false
  filesForDownload = [];
  

  image:any;
  imageBase64:any;


  constructor(
    private userService: UserService,
    private toastr: ToastrComponent,
    private sanitizer: DomSanitizer,
    private EncriptionService:EncriptionService
  ) {
   
   }

  ngOnInit() {
    setTimeout(() => {                       
      this.getPdfData()
    }, 1000);
    
  
  }

  manualPDFData() {
    this.is_loading = true
    this.userService.getMerchantFullViewnew().then(res => {
      console.log(res)
      if (res['status'] == 100) {

        this.pdf_merchant = res['data']['merchant_data'];
        console.log(this.pdf_merchant, '888888')

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

  // upload document
  // upload file and remove
  async uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
      this.base64_file_array.push(await this.getBase64(element))
      console.log(this.base64_file_array,'image wewew232323232')
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  getBase64(file) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result)
      }
      reader.readAsDataURL(file);
    })
  }
  resetImage() {
    this.base64_file_array=[]
    this.files=[]
  
  }
  
  submit_document() {
    console.log(this.files.length, 'lenth')
    let file_new =[]
    for (let index = 0; index < this.base64_file_array.length; index++) {

      file_new.push({
        "type":"Common files",
        "name": this.base64_file_array[index]
      })
    
    }
    let request = {
      "files": file_new
    }
    this.is_loading = true
    console.log(request,'5555')
    this.userService.uploadAllDocument(request).then(res => {
      
      if (res['status'] == 100) {
        this.is_loading = false
        this.resetImage()
        console.log(this.files,'empty')
        this.toastr.showToast('success', 'success', 'Successfully uploaded')
        
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

  
// get pdf
getPdfData() {
  this.is_loading = true
  this.userService.getPdf().then(res => {
    console.log(res,'what')
    if (res['status'] == 100) {
      this.pdf_data = res['data']['pdf'];
      this.is_loading = false
       this.is_disable=false
    } else if(res['status'] == 129){

      this.is_disable=true
    }else{
      this.is_disable=true
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


sanitizeImageUrl(pdf: string): SafeUrl {
  return this.sanitizer.bypassSecurityTrustUrl(pdf);
}

}
