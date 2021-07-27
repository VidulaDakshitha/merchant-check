import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EncriptionService} from './encription.service'

@Injectable({
    providedIn: 'root'
})
export class PackageService {
   constructor(private http: HttpClient,
        private commonService: CommonService, private encryption: EncriptionService) { }


//package services

    getViewPackage(id) {
    return this.commonService.getData('package/admin_get_package_requested_details/?id=' + id);
  }

    getPackageByPage(pageNumber, limit) {
    return this.commonService.getData('package/package_creation/?page=' + pageNumber + '&limit=' + limit);
  }

     getAllPackageData() {
    return this.commonService.getData('package/get_package/');
  }

     postPackageData(data){
      return this.commonService.postData('package/package_creation/',data);
  }

      updatePackageData(data, package_id){
      return this.commonService.putData('package/package_creation/?id=' + package_id, data);
  }
  deletePackage(id){
    return this.commonService.deleteData('package/package_creation/?id=' + id );
}


//Package budget services


    getPackageBudgetByPage(pageNumber, limit) {
    return this.commonService.getData('package/package_budget/?page=' + pageNumber + '&limit=' + limit);
  }

     postPackageBudgetData(data){
      return this.commonService.postData('package/package_budget/', data);
  }

      updatePackageBudgetData(data, package_id){
      return this.commonService.putData('package/package_budget/?id=' + package_id, data);
  }
        deletePackageBudget(id){
    return this.commonService.deleteData('package/package_budget/?id=' + id );
}


}