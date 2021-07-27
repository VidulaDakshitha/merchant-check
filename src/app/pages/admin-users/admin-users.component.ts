import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { ToastrComponent } from '../../@theme/components';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'ngx-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  is_loading = false
  p: number = 1;
  total: number = 0;
  pageSize: number = 10;
  userMessage
  admin_user_list: any[]
  addAdmin_model
  update_model_email
  update_model
  delete_admin_model
  admin_id
  slected_admin
  po_format = "+94"


  adminRegisterForm: FormGroup;
  adminUpdateForm: FormGroup;
  emailUpdateForm: FormGroup;
  deleteAdminForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastrComponent,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
  ) {
    this.adminRegisterForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phone_no: ['', [Validators.required, Validators.pattern('^(?:\\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\\d)\\d{6}$')]],
      nic: ['', [Validators.required, Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{12})$')]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      designation: ['', Validators.required],

    });
    this.adminUpdateForm = this.fb.group({
      id: ['', Validators.required],
      // email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      // phone_no: ['',[Validators.required,Validators.pattern('^(?:\\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\\d)\\d{6}$')]],
      nic: ['', [Validators.required, Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{12})$')]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      designation: ['', Validators.required],

    });
    this.emailUpdateForm = this.fb.group({
      user_id: ['', Validators.required],
      new_email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
    });
    this.deleteAdminForm = this.fb.group({
      user_id: ['', Validators.required],

    });
  }

  ngOnInit() {
    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }
    this.pageChangedAdmin(1)

  }
  pageChangedAdmin(newPage: any) {
    this.p = newPage
    this.getDataAdminUser(this.p, this.pageSize);
  }

  getDataAdminUser(p, pageSize) {
    this.admin_user_list = [] = []
    this.is_loading = true
    this.userService.getAdminAll(this.p, this.pageSize).then(
      res => {
        this.is_loading = false
        console.log('admin', res['data'])
        if (res['success']) {
          this.admin_user_list = res['data']['admin'];
          this.total = res['data']['count'];
          console.log('test', this.admin_user_list)
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
  //add admin user
  openAddAdmin(dialog: TemplateRef<any>) {
    this.addAdmin_model = this.dialogService.open(dialog, { closeOnBackdropClick: false });
  }

  close() {
    this.adminRegisterForm.reset()
    this.addAdmin_model.close()
  }

  addAdminData() {
    this.is_loading = true
    // let formatted_data = this.chequeForm.value

    this.userService.postAdminUserData(this.adminRegisterForm.value).then(res => {
      console.log(res)
      if (res['success']) {
        this.is_loading = false
        this.addAdmin_model.close()
        this.adminRegisterForm.reset()
        this.getDataAdminUser(this.p, this.pageSize)
        this.toastr.showToast('success', 'success', 'Add Admin Success')
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

  //update admin user
  openUpdate(dialogUpdate: TemplateRef<any>, admin_user) {
    this.adminUpdateForm.setValue({
      id: admin_user.id,
      nic: admin_user.nic,
      first_name: admin_user.first_name,
      last_name: admin_user.last_name,
      designation: admin_user.designation,
    });
    this.update_model = this.dialogService.open(dialogUpdate, { closeOnBackdropClick: false });
  }

  closeUpdate() {
    this.adminUpdateForm.reset()
    this.update_model.close()
  }

  updateAdminData() {
    this.is_loading = true
    this.userService.updateAdminData(this.adminUpdateForm.value, this.adminUpdateForm.value.id).then(res => {
      if (res['success']) {
        this.is_loading = false
        this.getDataAdminUser(this.p, this.pageSize)
        this.update_model.close()
        this.adminUpdateForm.reset()
        this.toastr.showToast('success', 'success', 'Add Admin Success')
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
  //Admin User View
  openAdminView(dialogAdminView: TemplateRef<any>, admin_user) {
    this.slected_admin = admin_user
    console.log(this.slected_admin)
    this.dialogService.open(
      dialogAdminView, { closeOnBackdropClick: false });
  }

  //update admin email
  openUpdateEmail(dialogUpdateEmail: TemplateRef<any>, admin_user) {
    this.emailUpdateForm.setValue({
      user_id: admin_user.user_id,
      new_email: admin_user.email,
    });
    this.update_model_email = this.dialogService.open(dialogUpdateEmail, { closeOnBackdropClick: false });
  }

  closeUpdateEmail() {
    this.emailUpdateForm.reset()
    this.update_model_email.close()
  }

  updateAdminEmailData() {
    this.is_loading = true
    console.log(this.emailUpdateForm.value)
    this.userService.updateAdminEmailData(this.emailUpdateForm.value).then(res => {
      if (res['success']) {
        this.is_loading = false
        this.getDataAdminUser(this.p, this.pageSize)
        this.update_model_email.close()
        this.emailUpdateForm.reset()
        this.toastr.showToast('success', 'success', 'Update Admin Success')
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

  // delete admin user
  openDeleteAdmin(dialogDeleteAdmin: TemplateRef<any>, admin_user) {
    this.deleteAdminForm.setValue({
      user_id: admin_user.id,

    });
    this.delete_admin_model = this.dialogService.open(dialogDeleteAdmin, { closeOnBackdropClick: false });
  }
  closeAdminDelete() {
    this.deleteAdminForm.reset()
    this.delete_admin_model.close()
  }

  deleteAdminData() {
    this.is_loading = true
    console.log('======', this.deleteAdminForm.value);

    this.userService.deleteAdminData(this.deleteAdminForm.value.user_id).then(res => {
      console.log(res)
      if (res['success']) {
        this.is_loading = false
        this.getDataAdminUser(this.p, this.pageSize)
        this.delete_admin_model.close()
        this.deleteAdminForm.reset()
        this.toastr.showToast('success', 'success', 'Delete Admin Success')
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


}
