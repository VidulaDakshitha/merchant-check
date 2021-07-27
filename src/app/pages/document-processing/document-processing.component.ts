import { Component, OnInit, TemplateRef, ChangeDetectorRef,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../@core/services/user.service';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../@theme/components';
// import { environment } from '../../../environments/environment'



@Component({
  selector: 'ngx-document-processing',
  templateUrl: './document-processing.component.html',
  styleUrls: ['./document-processing.component.scss']
})
export class DocumentProcessingComponent implements OnInit {
  @ViewChild('imageInput', { static: false }) fileUploader: ElementRef;
  updateFileForm: FormGroup;

  is_loading = false
  userMessage
  merchant_fils = []
  identification_merchant
  fileUpload_model
  file_doc

  image: any;
  imageBase64: any

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private toastr: ToastrComponent,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
    
  ) {
    this.updateFileForm = this.fb.group({
      id: ['', [Validators.required]],
      // name: ['', [Validators.required]],

    });
   }

  ngOnInit() {
    this.getMerchantFilesData()

  }

  getMerchantFilesData() {
    this.is_loading = true
    this.userService.getMerchantDocument().then(
      res => {
        this.is_loading = false
        if (res['status'] == 100) {
          this.merchant_fils = res['data'];
          this.identification_merchant = res['identification']
          console.log(this.identification_merchant, 'file res')
        }
        else {
          this.is_loading = false
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
  // file upload
  async onFileChangeImage(event) {
  
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      console.log(event)
      let reader = new FileReader();
  
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        this.file_doc = file.name
  
        reader.onload = () => {
          this.imageBase64 = reader.result;
          this.image = reader.result;
          this.cd.markForCheck();
         
        };
      }
    }
  }
  resetImage() {
    this.image = ""
    this.imageBase64 = ""
  }

  openUpdateFile(dialogUpdateFile: TemplateRef<any>,file) {
    setTimeout(() => {
      this.updateFileForm.setValue({
        id: file.id,
      });
    }, 1);
    this.fileUpload_model = this.dialogService.open(dialogUpdateFile, { closeOnBackdropClick: false });
  }


  updateFileData() {
    let data = this.updateFileForm.value
    data.name = this.imageBase64
    this.userService.addFile(data).then(res => {
      console.log(res)
      if (res['status'] == 100) {
        this.is_loading = false
        this.toastr.showToast('success','success' ,'Successfully Uploaded')
        this.fileUpload_model.close()
        this.getMerchantFilesData()
        this.resetImage()

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
