import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../@core/services/user.service';

import { ToastrComponent } from '../../../@theme/components';

@Component({
  selector: 'ngx-business-category',
  templateUrl: './business-category.component.html',
  styleUrls: ['./business-category.component.scss']
})
export class BusinessCategoryComponent implements OnInit {
  @ViewChild('imageInput', { static: false }) fileUploader: ElementRef;

  id = 0;
  
  p: number = 1;
  pageSize: number = 10
  total: number = 0;
  bCategoryForm: FormGroup;
  UpdateBCategoryForm: FormGroup;
  deletebCategoryForm: FormGroup;

  @Input() text: string;
  @Input() max: number = 20;

  business_category = []
  is_loading:boolean = false;
  addCategory_model

  update_b_category_model
  delete_b_category_model
  userMessage

  file: any = [];
  basic_data = []
  base64_file_array = []
  image_base_path = environment.aws;
  image: any;
  imageBase64: any
  images = []
  isHidden = true;
  row: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute, private dialogService: NbDialogService,
    private toastr: ToastrComponent,
    private cd: ChangeDetectorRef
  ) {
    this.bCategoryForm = this.fb.group({
      type: ['', Validators.required],
      key: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.UpdateBCategoryForm = this.fb.group({
      id: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      key: ['', Validators.required],
    });
    this.deletebCategoryForm = this.fb.group({
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
    this.is_loading = true
    this.business_category = []
    this.p = newPage
    this.router.navigate(['pages/settings/business-category/', { page: this.p}])
    this.getBusinessCategory(this.p,this.pageSize)
  }

  /////////////////////////////////////////////////////////////////////image upload
  onFileChange(event) {

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
 
  //get business category
  getBusinessCategory(page,limit) {
    this.is_loading = true
    this.userService.getBusinessCategory(page, limit).then(res => {
      console.log(res)
      if (res['message'] == "success") {
        this.business_category = res['data']['categories']
        this.total = res['data']['count'];
        this.is_loading = false
        this.business_category = this.business_category.map(item => ({
          ...item,
          showMore:false,
        }));
      }
      else {
        this.is_loading = false
        this.userMessage = res['message']
        this.toastr.showToast("danger", "Oh Snap!", res["message"])
      }
    })
  }
  
  // add busines Category
  openAddCategory(dialog: TemplateRef<any>) {
    this.addCategory_model = this.dialogService.open(dialog, { closeOnBackdropClick: false });
  }

  closeAddBCategory() {
    this.addCategory_model.close()
    this.bCategoryForm.reset()
  }

  addBCategory() {
 
      let data = this.bCategoryForm.value
      data.image = this.imageBase64
    
      this.is_loading = true
      this.userService.postCategoryData(data).then(res => {
        if (res['message'] == "success"){
          this.is_loading = false
          this.getBusinessCategory(this.p, this.pageSize)
          this.addCategory_model.close()
          this.bCategoryForm.reset()
          this.toastr.showToast('success', 'Cheers!', "Bank category added Successfully!")
        } else {
          this.is_loading = false
          console.log('error')
          this.userMessage = res['message']
          this.toastr.showToast('danger', 'Error', this.userMessage)
        }
      }, error => {
        this.is_loading = false
        console.log(error)
        this.toastr.showToast("danger", "Oh Snap!", "Internal Server Error!")
      })
    // }
  }

  //update bussiness Category
  openBCategoryUpdate(dialogUpdateBCategory: TemplateRef<any>, b_category) {
    setTimeout(() => {
      this.UpdateBCategoryForm.setValue({
        id: b_category.id,
        type: b_category.type,
        description: b_category.description,
        key: b_category.key,
      });
    }, 0);
   
    this.update_b_category_model = this.dialogService.open(dialogUpdateBCategory, { closeOnBackdropClick: false });
  }
  closeBtypUpdate() {
    this.update_b_category_model.close()
    this.UpdateBCategoryForm.reset()
   
  }


  updateBCategory() {
    this.is_loading = true
    let data = this.UpdateBCategoryForm.value
   
    if (this.imageBase64) {
      data['image'] = [this.imageBase64]
    }
    else {
      data['image'] = ''
    }

    console.log(data)
    this.userService.updateBCategoryData(data, this.UpdateBCategoryForm.value.id).then(res => {

      if (res['message'] == "success") {
        this.getBusinessCategory(this.p, this.pageSize)
        this.is_loading = false
        this.update_b_category_model.close()
        this.UpdateBCategoryForm.reset()
     
        this.toastr.showToast('success', 'Cheers!', "Bank category updated Successfully!")
      } else {
        this.is_loading = false
        console.log('error')
        this.userMessage = res['message']
        this.toastr.showToast("danger", "Oh Snap!", res["message"])
      }
    }, error => {
      this.is_loading = false
      this.toastr.showToast("danger", "Oh Snap!", "Internal Server Error!")
      console.log(error)
    })
  }
  // delete business Category
  openBCategoryDelete(dialogDeleteBCategory: TemplateRef<any>, b_category) {
    this.deletebCategoryForm.setValue({
      id: b_category.id,

    });
    this.delete_b_category_model = this.dialogService.open(dialogDeleteBCategory, { closeOnBackdropClick: false });
  }

  deleteBCategoryData() {
    this.is_loading = true
    this.userService.deleteBCategory(this.deletebCategoryForm.value.id).then(res => {
      if (res['message'] == 'success') {
        this.is_loading = false
        this.toastr.showToast('success', 'Cheers!', "Bank category deleted Successfully!")
        this.delete_b_category_model.close()
        this.deletebCategoryForm.reset()
        this.getBusinessCategory(this.p, this.pageSize)
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
