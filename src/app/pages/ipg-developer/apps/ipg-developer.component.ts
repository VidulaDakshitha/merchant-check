import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { ToastrComponent } from "../../../@theme/components";
import { GatewayService } from "../../../@core/services/gateway.service";
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: "ngx-ipg-developer",
  templateUrl: "./ipg-developer.component.html",
  styleUrls: ["./ipg-developer.component.scss"],
})
export class IpgDeveloperComponent implements OnInit {
  @ViewChild("imageInput", { static: false }) fileUploader: ElementRef;
  @Input() max: number = 50;

  textMessage:any;  
  selectedRadioButtonValue 
  seeMore: boolean[];

  msgHideAndShow:boolean=false;  
  loading: boolean = false;
  developerForm: FormGroup;
  disableAppForm: FormGroup;
  requestLiveForm: FormGroup;
  requestUpdateForm: FormGroup;
  view_details: any = {}
  applist: any = [];
  developer_info: any;
  viewModel: any;
  live: boolean = true;
  onDevelopment: boolean = false;
  subApproval: boolean = false;
  requestToLive: any;
  updateRequest: any;
  disableApp: any;
   copyBtn = document.getElementById('copyBtn');
  textToCopy: any;
  disacle_details: any;
  request_open: any;
  isCopied2: boolean;
  request_live: any;
  disabledButton: boolean = true;
  checkbox1 = false; 
  app_new_disable: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _clipboardService: ClipboardService,
    private dialogService: NbDialogService,
    private gatewayService: GatewayService,
    private toastr: ToastrComponent
  ) {
    this.developerForm = this.fb.group({
      developer_name: ["", Validators.required],
      developer_email: ["", Validators.required],
      developer_phone_no: ["", [Validators.required, Validators.pattern("[1-9]{1}[0-9]{8}")] ],
    });
    
    this.disableAppForm = this.fb.group({
      "is_permanent": ["", Validators.required],
      "reason": ["", Validators.required], 
    });

    this.requestLiveForm = this.fb.group({
      "ips": ["", Validators.required],
      "check": [false, Validators.required],
    });

    this.requestUpdateForm = this.fb.group({
      "app_state": [""],
      "title": ["", Validators.required],
      "description": ["", Validators.required],
    });
  }

  ngOnInit() {
    this.get_deleveloper_data();
    this.getApps();
  }

  updateDeveloperData() {
      let data={
        ...this.developerForm.value
      }
      data["developer_phone_no"] = "+94" + this.developerForm.value.developer_phone_no;
      this.gatewayService.update_developer_data(data).then(
        (res) => {
          if (res && res["status"] == 100) {
            this.toastr.showToast("success", "Cheers!", "Developer data successfully updated!");
          } else {
            this.toastr.showToast("danger", "Oh Snap!", res["message"]);
          }
          this.get_deleveloper_data();
          this.getApps();
        },
        (err) => {
          this.toastr.showToast(
            "danger",
            "Oh Snap!",
            "Please Check your internet connction"
          );
          this.get_deleveloper_data();
        }
      );
      
  }

  getApps() {
    this.gatewayService.getApps().then(
      (res) => {
        console.log(res)
        if (res && res["status"] == 100) {
          this.applist = res["data"];
        } else {
          this.toastr.showToast("danger", "Oh Snap!", res["message"] );
        }
      },
      (err) => {
        this.toastr.showToast(
          "danger",
          "Oh Snap!",
          "Please Check your internet connction"
        );
      }
    );
  }

  
  // getAppData(id) {
  
  //   this.gatewayService.getAppsById(id).then(res=>{

  //     if (res && res["status"] == 100) {
  //       if(res['data'].length) { 
  //         console.log(res['data']);
  //         this.disableAppForm.setValue({
  //           app_id:res['data'][0]['id'],
  //         })
         
  //       }else {
  //         this.toastr.showToast('danger', 'Oh Snap!', 'can not update app at this moment')
  //       }
  //     } else {
  //       this.toastr.showToast('danger', 'Oh Snap!', res['message'])
  //     }
  //   })
  // }

  get_deleveloper_data() {
    this.gatewayService.get_developer_data().then((res) => {
      if (res["status"] == 100) {
        this.developer_info = res["data"];
        this.developerForm.setValue({
          developer_name: res["data"]["developer_name"],
          developer_email: res["data"]["developer_email"],
          developer_phone_no: res["data"]["developer_phone_no"].substring(3),
        });
      } else {
        this.toastr.showToast("danger", "Oh Snap!", res["message"]);
        // this.toastr.showToast('success', 'success', 'Add Collection Type Success')
      }
    });
  }

  openView(dialog1: TemplateRef<any>, data) {
    this.view_details = data
    this.viewModel = this.dialogService.open(dialog1, {
      closeOnBackdropClick: false,
    });
  }

  opendisableApp(dialog4: TemplateRef<any>,data) {
    this.disacle_details = data;
    console.log(data);
    this.disableApp = this.dialogService.open(dialog4, {
      closeOnBackdropClick: false,
    });
  }

  closeView() {
    this.viewModel.close();
  }

  updateRequestOpen(dialog3: TemplateRef<any>,data) {
    this.request_open = data
    this.updateRequest = this.dialogService.open(dialog3, {
      closeOnBackdropClick: false,
    });
  }

  navigateToAdd() {
    if(this.developer_info["is_active"] == 0){
      this.toastr.showToast("danger", "Oh Snap!", "Please add developer details");
      this.app_new_disable = true;
    }else if(this.developer_info["is_active"] == 1){
      console.log("not Empty");
      this.router.navigate(["/pages/ipg-developer/app/add"]);
    }
  }

  requestLive(dialog2: TemplateRef<any>,data) {
    this.request_live = data
    this.requestToLive = this.dialogService.open(dialog2, {
      closeOnBackdropClick: false,
    });
  }

  closeApproval() {
    this.requestToLive.close();
    this.requestLiveForm.reset();
  }

  closeUpdateRequest() {
    this.updateRequest.close();
    this.requestUpdateForm.reset();
  }

  closeDisableApp() {
    this.disableApp.close();
    this.disableAppForm.reset();
  }

  getServiceString(services) {
    let service_string = "";

    for (let a = 0; a < services.length; a++) {
      service_string += services[a]["ipg_provider_name"];

      if(a != services.length-1) {
        service_string += '/ '
      }
    }

    return service_string;
  }


  openUpdate(id){
    this.router.navigate(['/pages/ipg-developer/app/update', id])
  }

  refreshToken(id) {
    let request = {
      app_id:id
    }
    this.gatewayService.refreshToken(request).then(
      (res) => {
        if (res && res["status"] == 100) {
          this.view_details['app_token'] = res["data"]['token'];
          this.getApps();
          this.toastr.showToast("success", "Cheers!", res["message"]);
        } else {
          this.toastr.showToast("danger", "Oh Snap!", res["message"]);
        }
      },
      (err) => {
        this.toastr.showToast("danger", "Oh Snap!", "Please Check your internet connction");
      }
    );
  }
  //copy token
  callServiceToCopy() {
    this._clipboardService.copy('This is copy thru service copyFromContent directly');
  }

  onCopyFailure() {
    this.toastr.showToast("danger", "Oh Snap!", "Cannot copy!");
  }

  disableAppData() {
   
    let request = {
      is_permanent : this.disableAppForm.value,
      app_id: this.disacle_details.id,
      message: this.disableAppForm.value.reason
    }
    console.log(request)
    this.gatewayService.disableApp(request).then(res=>{
      console.log(res)
      if(res && res['status'] == 100) {
        this.toastr.showToast('success', 'Cheers!', "App disabled successfully!");
        this.get_deleveloper_data();
        this.getApps();
        this.disableAppForm.reset();
        this.disacle_details.close();
      } else {
        this.toastr.showToast('danger', 'Oh Snap!', res['description'])
      }
    });

  }

  successCopied(){
    this.isCopied2 = true;
    if(this.isCopied2){
      this.toastr.showToast("success", "Cheers!","Copied successfully!");
    }
  }

  requestRequestUpdatedata(){
   
    let request = {
      app_state: this.requestUpdateForm.value.app_state,
      title: this.requestUpdateForm.value.title,
      description: this.requestUpdateForm.value.description,
      app_id: this.request_open.id
    }

    this.gatewayService.requestGoUpdate(request).then(res=>{
      console.log(res)
      if(res && res['status'] == 100) {
        this.updateRequest.close();
        this.requestUpdateForm.reset();

        this.toastr.showToast('success', 'Cheers!', "Modification request is submitted sucessfully!");
        this.get_deleveloper_data();
        this.getApps();
      } else {
        this.updateRequest.close();
        this.requestUpdateForm.reset();
        this.toastr.showToast('danger', 'Oh Snap!', res['status'])
      }
    });
  }

  requestLivedata(){
    let ips = this.requestLiveForm.value.ips.split(/\r?\n/)
    let filtered_ips = []
    ips.forEach(element => {
      if(element){
        filtered_ips.push(element)
      }
    });
    let request = {
      ips : filtered_ips,
      app_id: this.request_live.id,
    }

    this.gatewayService.requestGoLive(request).then(res=>{
      console.log(res)
      if(res && res['status'] == 100) {
        this.requestToLive.close();
        this.requestLiveForm.reset();
        this.toastr.showToast('success', 'Cheers!', "App submitted for approval sucessfully!");
        this.get_deleveloper_data();
        this.getApps();
      } else {
        this.requestToLive.close();
        this.toastr.showToast('danger', 'Oh Snap!', res['status'])
      }
    });
  }

  trimString(text, length) {
    return text.length > length ? 
           text.substring(0, length) + '...' :
           text;
  }

  openInput(event){
    console.log(event)
  }




}
