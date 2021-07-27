import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { BankService } from '../../../@core/services/bank.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { from } from 'rxjs';
import { environment } from '../../../../environments/environment'
import { ToastrComponent } from '../../../@theme/components';
import { EncriptionService } from '../../../@core/services/encription.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  @ViewChild('imageInput', { static: false }) fileUploader: ElementRef;

  is_loading:boolean = false
  p: number = 1;
  total: number = 0;
  pageSize: number = 10;
  bTypeForm: FormGroup;
  UpdateBTypeForm: FormGroup;
  deleteBTypeForm: FormGroup;

  bank_list = []
 

  bankForm: FormGroup;
  deleteBankForm: FormGroup;
  bankUpdateForm: FormGroup;
  addBank_model
  show_dialog = false
  
  update_model
  delete_bank_model
  userMessage

  image: any;
  image_base_path = environment.aws;
  imageBase64: any
  encrypt_val;
  loading: boolean;

  constructor(private bankService: BankService,
    private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder,private decrypt: EncriptionService, private dialogService: NbDialogService, private toastr: ToastrComponent,
    private cd: ChangeDetectorRef) {

    this.bankForm = this.fb.group({
      key: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.pattern("^[0-9]{4}$")]],
      image: ['', Validators.required],
    });
    this.bankUpdateForm = this.fb.group({
      id: ['', Validators.required],
      key: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.pattern("^[0-9]{4}$")]],
      image: [""],
    });
    this.deleteBankForm = this.fb.group({
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
    this.router.navigate(['pages/settings/bank/', { page: this.p}])
    this.getBank(this.p,this.pageSize)
  }
  //add bank 
  open2(dialog: TemplateRef<any>) {
    this.addBank_model = this.dialogService.open(dialog, { closeOnBackdropClick: false });
  }
  close2() {
    this.resetImage()
    this.bankForm.reset()
    this.addBank_model.close()
  }
  addBankData() {
      this.is_loading = true
      this.loading = true
      setTimeout(() => this.is_loading = false, 3000);

      if (!this.bankForm.valid) {
        this.toastr.showToast('danger', 'error', 'error')
      } else {
      let data = this.bankForm.value
      data['image'] = [this.imageBase64]
      this.bankService.postBankData(this.bankForm.value).then(res => {
        this.loading = false
        if (res['message'] == 'success') {
          this.getBank(this.p,this.pageSize);
          this.is_loading = false
          this.addBank_model.close();
          this.bankForm.reset()
          this.resetImage()
          this.toastr.showToast("success", "Cheers!","Bank added successfully!")
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
  }

  //update bank
  open3( dialog3: TemplateRef<any> , bank ) {
    setTimeout(() => {
      this.bankUpdateForm.setValue({
        id: bank.id,
        key: bank.key,
        name: bank.name,
        code: bank.code,
        image: bank.image,
      });
    }, 0);
    this.image = this.image_base_path + bank.image
    this.update_model = this.dialogService.open(dialog3, { closeOnBackdropClick: false });
  }

  close3() {
    this.bankUpdateForm.reset()
    this.update_model.close()
  }
  updateBankData() {
    this.is_loading = true
    this.loading = true
    let data = this.bankUpdateForm.value
   
    if (this.imageBase64) {
      data['image'] = [this.imageBase64]
    }
    else {
      data = {
         name: this.bankUpdateForm.value.name,
         key: this.bankUpdateForm.value.key ,
         code: this.bankUpdateForm.value.code
      }
    }
    // this.resetImage()
    console.log(this.bankUpdateForm.value)
    this.bankService.updateBankData(data, this.bankUpdateForm.value.id).then(res => {
      this.loading = false
      if (res['message'] == 'success' ) {
        this.is_loading = false
        this.getBank(this.p,this.pageSize)
        this.update_model.close()
        this.bankUpdateForm.reset()
        this.resetImage()
        this.toastr.showToast("success", "Cheers!","Bank updated successfully!")
      } else {
        this.is_loading = false
        console.log('error')
        this.userMessage = res['message']
        this.toastr.showToast("danger", "Oh Snap!", res["message"])
      }
    }, error => {
      this.loading = false
      this.is_loading = false
      this.toastr.showToast("danger", "Oh Snap!", "Internal Server Error!")
    })
  }

  //get bank
  getBank(page,limit) {
    this.is_loading = true
    this.bankService.getBank(page,limit).then(res => {
  
      if (res['message'] == 'success') {
        this.bank_list = res['data']
        this.is_loading = false
        this.total = res['data']['count'];
      }
      else {
        this.is_loading = false
        console.log('error')
        this.userMessage =res['message']
        this.toastr.showToast("danger", "Oh Snap!", res["message"])
      }
    })
  }

  // image upload///////////////////////////////////////////////////////////////////
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
    console.log(this.fileUploader.nativeElement,'rest')
    this.fileUploader.nativeElement.value = "";
  }

  // delete bank
  openDeleteBank(dialogDeleteBank: TemplateRef<any>, bank) {
    this.deleteBankForm.setValue({
      id: bank.id,
    });
    this.delete_bank_model = this.dialogService.open(dialogDeleteBank,{closeOnBackdropClick:false });
  }

  deleteBankData() {
    this.is_loading = true
    this.loading = true
    this.bankService.deleteBank(this.deleteBankForm.value.id).then(res => {
      this.loading = false
      if (res['message'] == 'success') {
        this.is_loading = false
        this.loading = false
        this.toastr.showToast("success", "Cheers!","Bank deleted successfully!")
        this.delete_bank_model.close();
        this.getBank(this.p,this.pageSize);
      } else {
        this.is_loading = false
        this.loading = false
        this.userMessage = res['message']
        this.toastr.showToast("danger", "Oh Snap!", res["message"])
      }
    }, error => {
      this.is_loading = false
      this.loading = false
      this.toastr.showToast("danger", "Oh Snap!", "Internal Server Error!")
    })
  }


}
