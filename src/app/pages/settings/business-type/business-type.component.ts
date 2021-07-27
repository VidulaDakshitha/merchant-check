import { Component, OnInit, TemplateRef, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ToastrComponent } from '../../../@theme/components';
import { UserService } from '../../../@core/services/user.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { environment } from '../../../../environments/environment'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.scss']
})

export class BusinessTypeComponent implements OnInit {
  @ViewChild('imageInput', { static: false }) fileUploader: ElementRef;

  p: number = 1;
  total: number = 0;
  pageSize: number = 10;
  bTypeForm: FormGroup;
  UpdateBTypeForm: FormGroup;
  deleteBTypeForm: FormGroup;

  business_type = []
  is_loading:boolean = false
  addType_model
  update_b_type_model
  delete_b_type_model
  userMessage

  file: any = [];
  basic_data = []
  base64_file_array = []
  image_base_path = environment.aws;
  image: any;
  imageBase64: any
  images = []
  isHidden = true;
  loading: boolean;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute, private dialogService: NbDialogService,
    private toastr: ToastrComponent,
    private cd: ChangeDetectorRef
  ) {
    this.bTypeForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
    this.UpdateBTypeForm = this.fb.group({
      id: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
    this.deleteBTypeForm = this.fb.group({
      id: ['', Validators.required],
    });
  }

  ngOnInit() {
    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }

    this.pageChangedAdmin(page_no)
  }

  pageChangedAdmin(newPage: any) {
    this.p = newPage
    this.router.navigate(['pages/settings/business-type/', { page: this.p}])
    this.getBusinessType(this.p,this.pageSize)
   
  }

  /////////////////////////////////////////////////////////////////////image upload
  onFileChange(event) {
    console.log(event)
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageBase64 = reader.result;
        this.image = reader.result;
        this.cd.markForCheck();
      };
    }
  }
  
  updateValues() {

  }

  resetImage() {
    console.log('test rest image')
    this.image = ""
    this.imageBase64 = ""
    console.log(this.fileUploader.nativeElement)
    this.fileUploader.nativeElement.value = "";
  }

  //GET BUISNESS TYPE
  getBusinessType(page,limit) {
    this.is_loading = true
    this.userService.getBusinessType(page,limit).then(res => {
      console.log(res)
      if (res['message'] == "success") {
        this.is_loading = false
        this.business_type = res['data']['types']
        this.total = res['data']['count'];
      }
      else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast("danger", "Oh Snap!", res["message"])
      }
    })
  }

  //ADD BUISNESS TYPE
  openAddType(dialog: TemplateRef<any>) {
    this.addType_model = this.dialogService.open(dialog, { closeOnBackdropClick: false });
  }

  closeAddBtype() {
    this.resetImage()
    this.addType_model.close()
    this.bTypeForm.reset()
  }

  closeDeleteBtype() {
    this.delete_b_type_model.close();
    this.deleteBTypeForm.reset();
  }

  addBType() {
 
      let data = this.bTypeForm.value
      data.image = this.imageBase64
      this.loading = true
      this.is_loading = true
      this.userService.postTypeData(data).then(res => {
        this.loading = false
        this.is_loading = false
        if (res['message'] == "success"){
          this.getBusinessType(this.p,this.pageSize)
          this.addType_model.close()
          this.bTypeForm.reset()
          this.resetImage()
          this.toastr.showToast('success', 'Cheers!', "Buisness type ddded Successfully!")
        } else {
          this.is_loading = false
          console.log('error')
          this.userMessage = res['message']
          this.toastr.showToast("danger", "Oh Snap!", res["message"])
        }
      }, error => {
        this.is_loading = false
        this.loading = false
        console.log(error)
        this.toastr.showToast("danger", "Oh Snap!", "Internal Server Error!")
      })
    // }
  }

  //UPDATE BUISNESS TYPE
  openBTypeUpdate(dialogUpdateBType: TemplateRef<any>, b_type) {
    setTimeout(() => {
      this.UpdateBTypeForm.setValue({
        id: b_type.id,
        type: b_type.type,
        description: b_type.description,
        image: b_type.image,
      });
    }, 0);
    this.image = this.image_base_path + b_type.image
    this.update_b_type_model = this.dialogService.open(dialogUpdateBType, { closeOnBackdropClick: false });
  }
  closeBtypUpdate() {
    this.update_b_type_model.close()
    this.UpdateBTypeForm.reset()
    this.resetImage()
  }


  updateBType() {
    this.is_loading = true
    this.loading = true    
    let data = this.UpdateBTypeForm.value
    console.log(this.imageBase64)
    if (this.imageBase64) {
      data['image'] = this.imageBase64
    }
    else {
     data={
       type: this.UpdateBTypeForm.value.type,
       description: this.UpdateBTypeForm.value.description
     }
    }
    this.is_loading = true
    this.userService.updateBTypeData(data, this.UpdateBTypeForm.value.id).then(res => {
        this.loading = true
      if (res['message'] == "success") {
        this.getBusinessType(this.p,this.pageSize)
        this.is_loading = false
        this.update_b_type_model.close()
        this.UpdateBTypeForm.reset()
        this.resetImage()
        this.toastr.showToast('success', 'Cheers!', "Buisness type updated Successfully!")
      } else {
        this.is_loading = false
        console.log('error')
        this.userMessage = res['message']
        this.toastr.showToast("danger", "Oh Snap!", res["message"])
      }
    }, error => {
      this.is_loading = false
      this.loading = true
      this.toastr.showToast("danger", "Oh Snap!", "Internal Server Error!")
      console.log(error)
    })
  }

  // DELETE business type
  openBTypeDelete(dialogDeleteBType: TemplateRef<any>, b_type) {
    this.deleteBTypeForm.setValue({
      id: b_type.id,

    });
    this.delete_b_type_model = this.dialogService.open(dialogDeleteBType, { closeOnBackdropClick: false });
  }

  deleteBtypeData() {
    this.is_loading = true
    this.loading = true
    this.userService.deleteBType(this.deleteBTypeForm.value.id).then(res => {
      this.loading = false
      if (res['message'] == 'success') {
        this.is_loading = false
        this.toastr.showToast('success', 'Cheers!', "Buisness type deleted Successfully!")
        this.delete_b_type_model.close()
        this.deleteBTypeForm.reset()
        this.getBusinessType(this.p,this.pageSize)
      } else {
        this.is_loading = false
        console.log('error')
        this.userMessage = res['message']
        this.toastr.showToast("danger", "Oh Snap!", res["message"])
      }
    }, error => {
      this.is_loading = false
      console.log(error)

      this.toastr.showToast("danger", "Oh Snap!", "Internal Server Error!")
    })
  }

  trimString(text, length) {
    return text.length > length ? 
           text.substring(0, length) + '...' :
           text;
  }

}
