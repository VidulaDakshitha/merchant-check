import { Component, OnInit } from "@angular/core";
import { ToastrComponent } from "../../../@theme/components";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { AdminAppService } from "../../../@core/services/admin-app.service";
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: "ngx-view-apps",
  templateUrl: "./view-apps.component.html",
  styleUrls: ["./view-apps.component.scss"],
})
export class ViewAppsComponent implements OnInit {
  id = "";
  tabs: any[0];

  app_list;
  listDetails: "";
  updateForm: FormGroup;
  providers = []

  //For pagination
  p: number = 1;
  pageSize: number = 10;
  total: number = 0;

  is_loading = false;
  userMessage;

  service_providers=[]
  all_service_providers = []
  viewModel: any

  constructor(
    private toastr: ToastrComponent,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private app_service: AdminAppService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.is_loading = true
    console.log('llll')
    this.id = this.route.snapshot.params.id;

    this.getDataWithFilters(this.id);

    this.updateForm = this.fb.group({
      name: [""],
      description: [""],
      url: [""],
      token: [""],
    });

    this.getMerchants()
    this.getProviders()
  }

  getDataWithFilters(id) {
    let condition = "";
    condition = condition + "&id=" + id;

    this.app_service.getAllAppsByPage(1, 10, condition).then(
      (res) => {
        this.is_loading = false;
        console.log(res);
        if (res["message"] == "success") {
          this.app_list = res["data"][0];

          this.updateForm.setValue({
            name: this.app_list.app_name,
            description: this.app_list.app_description,
            url: this.app_list.callback_url,
            token: this.app_list.callback_token,
          });

          this.providers = this.app_list.assign_providers.map(obj=> ({ ...obj, is_updated: false }));

          this.total = res["count"];
        } else {
          this.userMessage = res["message"];
          this.toastr.showToast("danger", "Oh Snap!", this.userMessage);
        }
      },
      (err) => {
        this.is_loading = false;
        console.log(err);
        this.toastr.showToast("danger", "Oh Snap!", "Internal Server Error");
      }
    );
  }

  copyMessage(val: string) {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);

    this.toastr.showToast("success", "Cheers!", "successfully copied to clipboard");
  }

  updateData() {
    if (
      this.updateForm.value["name"] == "" ||
      this.updateForm.value["description"] == "" ||
      this.updateForm.value["url"] == "" ||
      this.updateForm.value["token"] == ""
    ) {
      this.toastr.showToast("danger", "Oh Snap!", "Cannot keep fields blank");
    } else {
      const data = {
        id: this.id,
        app_name: this.updateForm.value["name"],
        description: this.updateForm.value["description"],
        callback_url: this.updateForm.value["url"],
        callback_token: this.updateForm.value["token"],
      };

      this.app_service.updateApps(data).then(
        (res) => {
          this.is_loading = false;

          if (res["message"] == "success") {
            this.toastr.showToast("success", "Cheers!", this.userMessage);
            this.getDataWithFilters(this.id);
          } else {
            this.userMessage = res["message"];
            this.toastr.showToast("danger", "Oh Snap!", this.userMessage);
          }
        },
        (err) => {
          this.is_loading = false;
          console.log(err);
          this.toastr.showToast("danger", "Oh Snap!", "Internal Server Error");
        }
      );
    }
  }

  replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.toString().replace(new RegExp(escapedFind, "g"), replace);
  }

  loadToJsonEditor(data) {
    let str, obj;
    data = this.replaceAll(data, "True", "true");
    data = this.replaceAll(data, "False", "false");

    try {
      str = data.replace(/'/g, '"');

      obj = JSON.parse(str);
    } catch (e) {
      try {
        obj = (0, eval)("(" + data + ")");
      } catch (e) {
        //console.log(e)
        obj = {};
      }
    }

    return obj;
  }

  get card_request_json() {
    return JSON.stringify(
      this.loadToJsonEditor(
        this.app_list.app_origins[0] ? this.app_list.app_origins[0] : "{}"
      ),
      null,
      2
    );
  }

  
  getMerchants(){
    this.app_service.getProviderMerchants().then(res=>{
      console.log(res)
      if(res['status']==100) {
        this.service_providers = res['data']
      }
    })
  }

  getProviders(){
    this.app_service.getAllService().then(res=>{
      console.log(res)
      if(res['status']==100) {
        this.all_service_providers = res['data']
      }
    })
  }

  getValidMerchants(provider_key){
    return this.service_providers.filter(provider => provider.provider_key == provider_key)
  }

  changeMerchant(index){
    this.providers[index]['is_updated'] = true
  }

  updateMerchantInProvider(merchant_id, provider_id, index) {
    let request = {
      app_id: this.id,
      provider_id: provider_id,
      merchant_id: merchant_id
    }

    this.app_service.changeAssignAppMerchant(request).then(res=>{
      if(res['status']==100) {
        this.providers[index]['is_updated'] = false
        this.toastr.showToast("success", "Cheers!", 'Successfully updated merchant');
      } else {
        this.toastr.showToast("danger", "Oh Snap!", res['message']);
      }
    })
  }

  updateAccountNumberInProvider(account, provider_id, index){
    let request = {
      app_id: this.id,
      provider_id: provider_id,
      account_number: account
    }

    this.app_service.changeAssignAppAccount(request).then(res=>{
      if(res['status']==100) {
        this.providers[index]['is_updated'] = false
        this.toastr.showToast("success", "cheers!", 'Successfully updated Account Number');
      } else {
        this.toastr.showToast("danger", "error", res['message']);
      }
    })
  }

  openColumnSelection(selectionModel) {
    this.viewModel = this.dialogService.open(selectionModel, {
      closeOnBackdropClick: false,
    });
  }

  cancel(){
    this.viewModel.close()
  }

  addNewProvider(provider) {
    if(!provider){
      this.toastr.showToast("danger", "Oh Snap!", 'Please select service provider');
      return;
    }

    let request = {
      app_id: this.id,
      provider_id: provider
    }

    this.app_service.assignProvider(request).then(res=>{
      if(res['status']==100) {
        this.viewModel.close()
        this.getDataWithFilters(this.id)
        this.toastr.showToast("success", "Cheers!", 'Successfully added new provider');
      } else {
        this.toastr.showToast("danger", "Oh Snap!", res['message']);
      }
    })
  }

  deleteProvider(provider_id){
    let request = {
      app_id: this.id,
      provider_id: provider_id
    }

    this.app_service.deleteProvider(request).then(res=>{
      if(res['status']==100) {
        this.getDataWithFilters(this.id)
        this.toastr.showToast("success", "Cheers!", 'Successfully removed provider');
      } else {
        this.toastr.showToast("danger", "Oh Snap!", res['message']);
      }
    })
  }

  approveApp(){
    this.is_loading = true
    let request = {
      id: this.id
    }

    this.app_service.updateAppStatus(request).then(res=>{
      this.is_loading = false
      if(res['status']==100) {
        this.getDataWithFilters(this.id)
        this.toastr.showToast("success", "Cheers!", 'Successfully approved app');
      } else {
        this.toastr.showToast("danger", "Oh Snap!", res['message']);
      }
    })
  }



}

