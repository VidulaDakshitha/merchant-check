import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrComponent } from "../../../@theme/components";
import { GatewayService } from "../../../@core/services/gateway.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'ngx-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.scss']
})
export class UpdateAppComponent implements OnInit {
  id: any
  update_form: FormGroup;
  ipgProviders: any = [];
  app: any
  loading_message = "loading.."

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrComponent,
    private gatewayService: GatewayService,
    private route: ActivatedRoute
  ) {
    this.update_form = this.fb.group({
      app_id:[""],
      app_name: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9 ;:@'.,?!*/%#&_+-=]+$")]],
      description: ["", [Validators.required ,Validators.pattern("[a-zA-Z0-9 ;:@'.,?!*/%#&_+-=]+$")]],
      callback_url: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9 ;:@'.,?!*/%#&_+-=]+$")]],
      callback_token: ["",[Validators.required ,Validators.pattern("[a-zA-Z0-9 ;:@'.,?!*/%#&_+-=]+$")]],
    });
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("appid")
    this.getAppData(this.id)
  }

  getAppData(id) {
    this.loading_message = "loading.."
    this.gatewayService.getAppsById(id).then(res=>{

      if (res && res["status"] == 100) {
        if(res['data'].length) { 
          console.log(res['data']);
          this.update_form.setValue({
            app_id:res['data'][0]['id'],
            app_name:res['data'][0]['app_name'],
            description: res['data'][0]['app_description'],
            callback_url: res['data'][0]['callback_url'],
            callback_token: res['data'][0]['callback_token'],
          })
         
          this.getIPGProviders(res['data'][0]['assign_providers'])
        }else {
          this.loading_message = "can not find valid app.."
          this.toastr.showToast('danger', 'Oh Snap!', 'Cannot update app at this moment!')
        }
      } else {
        this.loading_message = "Cannot find valid app!"
        this.toastr.showToast('danger', 'Oh Snap!', res['message'])
      }
    })
  }

  getIPGProviders(selected_providers) {
    this.ipgProviders = []
    this.gatewayService.getIpgProviders().then((res) => {
      if (res && res["status"] == 100) {
        let providers = res["data"];
       
        for (let a = 0; a < providers.length; a++) {
          if(this.isAvailableProvider(selected_providers, providers[a]['id'])) {
              this.ipgProviders.push({
                ...providers[a], state: true
              })
          } else {
            this.ipgProviders.push({
              ...providers[a], state: false
            })
          }
        }

        console.log(this.ipgProviders)
      }
    });
  }

  isAvailableProvider(provider, id){
    try {
      let data = provider.filter(obj=>obj.ipg_provider_id==id)
      return data.length
    } catch (error) {
      console.log(error)
      return false
    }
  }

  addAppData() {
    let active_providers = [];
    for (let a = 0; a < this.ipgProviders.length; a++) {
      if (this.ipgProviders[a]["state"]) {
        active_providers.push({
          'id': this.ipgProviders[a]["id"],
          'is_delete': false
        });
      } else {
        active_providers.push({
          'id': this.ipgProviders[a]["id"],
          'is_delete': true
        });
      }
    }

    let request = {
      ...this.update_form.value,
      services: active_providers
    }
    
    this.gatewayService.updateApp(request).then(res=>{
      if(res && res['status'] == 100) {
        this.toastr.showToast('success', 'Cheers!', "App updated successfully!")
        this.cancel();
        this.router.navigate(["/pages/ipg-developer/app"]);

      } else {
        this.toastr.showToast('danger', 'Oh Snap!', res['message'])
      }
    })
  }

  onProviderChange(event, id) {
    let objIndex = this.ipgProviders.findIndex((obj) => obj.id == id);
    this.ipgProviders[objIndex].state = event;

    console.log(this.ipgProviders);
  }
  // this.update_form.dirty || this.update_form.get('callback_token').touched || 
  cancel() {
    this.getAppData(this.id);
  }

  is_valid_providers(): boolean {
    let providers = this.ipgProviders.filter((obj) => obj.state);

    return providers.length ? true : false;
  }

}
