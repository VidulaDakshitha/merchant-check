import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrComponent } from "../../../@theme/components";
import { GatewayService } from "../../../@core/services/gateway.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-add-update-app",
  templateUrl: "./add-update-app.component.html",
  styleUrls: ["./add-update-app.component.scss"],
})
export class AddUpdateAppComponent implements OnInit {
  addForm: FormGroup;
  update: boolean = false;
  ipgProviders: any = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrComponent,
    private router: Router,
    private gatewayService: GatewayService
  ) {
    this.addForm = this.fb.group({
      app_name: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9 ;:@'.,?!*/%#&_+-=]+$")]],
      description: ["", [Validators.required ,Validators.pattern("[a-zA-Z0-9 ;':@.,?!%*/_#&+-=]+$")]],
      callback_url: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9 ;:'@.,?!*%_/#&+-=]+$")]],
      callback_token: ["",[Validators.required ,Validators.pattern("[a-zA-Z0-9 ;:'@.,?!%*_/#&+-=]+$")]],
    });
  }
  
  ngOnInit() {
    this.getIPGProviders();
  }

  getIPGProviders() {
    this.gatewayService.getIpgProviders().then((res) => {
      console.log(res);
      if (res && res["status"] == 100) {
        let providers = res["data"];
        providers = providers.map((obj) => ({ ...obj, state: false }));
        this.ipgProviders = providers;
      }
    });
  }

  addAppData() {
    let active_providers = [];
    for (let a = 0; a < this.ipgProviders.length; a++) {
      if (this.ipgProviders[a]["state"]) {
        active_providers.push(this.ipgProviders[a]["id"]);
      }
    }

    let request = {
      ...this.addForm.value,
      services: active_providers
    }
    
    this.gatewayService.addApp(request).then(res=>{
      if(res && res['status'] == 100) {
        this.toastr.showToast('success', 'Cheers!', "App successfully added!")
        this.cancel();
        this.router.navigate(["/pages/ipg-developer/app"]);
      } else {
          if(res['message'] == "decryption error"){
            this.toastr.showToast('danger', 'Oh Snap!', "Please provide valid characters!");
          }else{
            this.toastr.showToast('danger', 'Oh Snap!', res['message']);
          }
      }
    })
  }

  onProviderChange(event, id) {
    let objIndex = this.ipgProviders.findIndex((obj) => obj.id == id);
    this.ipgProviders[objIndex].state = event;

    console.log(this.ipgProviders);
  }

  cancel() {
    this.addForm.reset();
    this.ipgProviders = this.ipgProviders.map((obj) => ({
      ...obj,
      state: false,
    }));
  }

  is_valid_providers(): boolean {
    let providers = this.ipgProviders.filter((obj) => obj.state);

    return providers.length ? true : false;
  }
}
