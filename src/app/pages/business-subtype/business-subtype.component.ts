import { Component, OnInit,TemplateRef,ViewChild,ElementRef,ChangeDetectorRef} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../@theme/components';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService} from '../../@core/services/user.service'
import { from } from 'rxjs';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'ngx-business-subtype',
  templateUrl: './business-subtype.component.html',
  styleUrls: ['./business-subtype.component.scss']
})
export class BusinessSubtypeComponent implements OnInit {
  @ViewChild('imageInput', { static: false }) fileUploader: ElementRef;

  subtypeAddForm: FormGroup;
  subtypeUpdateForm: FormGroup;
  deleteSubtypeForm: FormGroup;

  is_loading = false
  userMessage
  subtype :any = []
  btype_date:any = []



  add_model_subtype
  update_model_subtype
  delete_subtype_model

  file: any = [];
  basic_data = []
  base64_file_array = []
  image_base_path = environment.aws;
  image: any;
  imageBase64: any
  images = []
  isHidden = true;
  p: any;

  constructor(
    private toastr: ToastrComponent,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { 
    this.subtypeAddForm = this.fb.group({
      sub_type: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
    this.subtypeUpdateForm = this.fb.group({
      sub_type: ['', Validators.required],
      description: ['', Validators.required],
      image_url: [''],
      id:[''],
    });
    this.deleteSubtypeForm = this.fb.group({
      id: ['', Validators.required],
      
    });
    
  }
  ngOnInit() {
    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }
    
    this.pageChangedAdmin(page_no);
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
  updateValues(event) {

  }


  resetImage() {
    this.image = ""
    this.imageBase64 = ""
    console.log(this.fileUploader.nativeElement)
    this.fileUploader.nativeElement.value = "";
  }

   //subtype add
   openAddSubtype(dialogAddSubtype: TemplateRef<any>) {
    this.add_model_subtype = this.dialogService.open(dialogAddSubtype, { closeOnBackdropClick: false });
  }

  pageChangedAdmin(newPage: any) {
    this.p = newPage
    this.getSubtype()
  }


  submit_subtype() {
    if (!this.subtypeAddForm.valid) {
      this.toastr.showToast('danger', 'error', 'error')
    } else {
      let data = this.subtypeAddForm.value
  
      data.image = this.imageBase64
      this.resetImage()
  
    let formatted_data = this.subtypeAddForm.value
      formatted_data.type = this.route.snapshot.params.id
  
    this.is_loading = true
    this.userService.postsubtypeData(this.subtypeAddForm.value).then(res => {
      console.log(this.subtypeAddForm.value)
      if (res['message'] == 'success'  ) {
        // this.getCollection(this.p, this.pageSize)
        this.is_loading = false
        this.add_model_subtype.close()
        this.subtypeAddForm.reset()
        this.getSubtype()
        this.toastr.showToast('success', 'success','Subtype is successfully added')
      } else {
        this.is_loading = false
        
        this.toastr.showToast('danger', 'error', 'error')
      }
    }, error => {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Internal server error')
    })
  }
  }


  getSubtype() {
    this.is_loading = true
    this.userService.getSubtypeById(this.route.snapshot.params.id).then(
      res => {
        this.is_loading = false
        if (res['message'] == 'success') {
        
          this.subtype = res['data']['subtype'];
          this.btype_date = res['data'];
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
  }

  //update subtype
  openUpdateSubtype(dialogUpdateSubtype: TemplateRef<any>, subtype_data_list) {
    console.log(this.route.snapshot.params.id, 'test 6666666666666666')
    setTimeout(() => {
      this.subtypeUpdateForm.setValue({
        id: subtype_data_list.id,
        sub_type: subtype_data_list.subtype,
        description: subtype_data_list.description,
        image_url: subtype_data_list.image,
      

      });
    }, 0);
    this.image = this.image_base_path + subtype_data_list.image
    this.update_model_subtype = this.dialogService.open(dialogUpdateSubtype, { closeOnBackdropClick: false });
  }

  updated_subtype() {

    this.is_loading = true
    let data = this.subtypeUpdateForm.value
    if (this.imageBase64) {
      data.image_url = this.imageBase64
    }
    else {
      data.image_url = ''
    }


    this.userService.updateSubtypeData(this.subtypeUpdateForm.value).then(res => {
      this.is_loading = false
      if (res['message'] == 'success') {
        this.update_model_subtype.close()
        this.subtypeUpdateForm.reset()
        this.getSubtype()
        this.resetImage()
        this.toastr.showToast('success', 'success', 'Subtype is successfully updated')
      } else {
        this.toastr.showToast('danger', 'error', 'Error')
      }
    }, error => {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Internal server error')
    })
  }
  //delete subtype
  openDeleteSubtype(dialogDeleteSubtype: TemplateRef<any>, subtype_data_list) {
    this.deleteSubtypeForm.setValue({
      id: subtype_data_list.id,

    });
    this.delete_subtype_model = this.dialogService.open(dialogDeleteSubtype, { closeOnBackdropClick: false });
  }

  deleteSubtypeData() {
    this.is_loading = true
    this.userService.deleteSubtypeData(this.deleteSubtypeForm.value.id).then(res => {
      this.is_loading = false
      if (res['message'] == 'success') {
        this.toastr.showToast('success', 'success', 'Subtype is successfully deleted')
        this.delete_subtype_model.close()
        this.deleteSubtypeForm.reset()
        this.getSubtype()
      } else {
        console.log('error')
        this.toastr.showToast('danger', 'error', 'Error')
      }
    }, error => {
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'Internal server error')
    })
  }
}
