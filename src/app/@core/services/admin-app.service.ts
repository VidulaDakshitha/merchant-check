import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AdminAppService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  getAllAppsByPage(pageNumber, limit, condition) {
    return this.commonService.getData(
      "ipg/ipg/admin/apps/?page=" + pageNumber + "&limit=" + limit + condition
    );
  }

  getAllService() {
    return this.commonService.getData("ipg/ipg/app-providers/");
  }

  updateApps(data) {
    return this.commonService.putData("ipg/ipg/admin/apps/", data);
  }

  updateAppStatus(data) {
    return this.commonService.postData("ipg/ipg/admin/app-approve/", data);
  }

  getProviderMerchants() {
    return this.commonService.getData("ipg/ipg/admin/provider-merchants/");
  }

  changeAssignAppMerchant(data) {
    return this.commonService.postData("ipg/ipg/admin/assign-change-provider-merchants/", data);
  }

  changeAssignAppAccount(data) {
    return this.commonService.postData("ipg/ipg/admin/assign-change-provider-account/", data);
  }

  assignProvider(data) {
    return this.commonService.postData("ipg/ipg/admin/assign-provider/", data);
  }

  deleteProvider(data) {
    return this.commonService.postData("ipg/ipg/admin/remove-provider/", data);
  }

  
}