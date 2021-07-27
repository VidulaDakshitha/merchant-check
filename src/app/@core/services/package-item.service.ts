import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EncriptionService} from './encription.service'

@Injectable({
    providedIn: 'root'
})
export class PackageItemService {
   constructor(private http: HttpClient,
        private commonService: CommonService, private encryption: EncriptionService) { }

//For package add item
    getPackageItemByPage(pageNumber, limit) {
    return this.commonService.getData('package/package_item/?page=' + pageNumber + '&limit=' + limit);
  }

      getAllPackageItem() {
    return this.commonService.getData('package/get_item/');
  }

     postPackageItemData(data){
      return this.commonService.postData('package/package_item/', data);
  }

      updatePackageItemData(data, package_id){
      return this.commonService.putData('package/package_item/?id=' + package_id, data);
  }
  deleteItemPackage(id){
    return this.commonService.deleteData('package/package_item/?id=' + id );
}


//For package assign item
    getPackageAssignItemByPage(pageNumber, limit) {
    return this.commonService.getData('package/package_assigned_item/?page=' + pageNumber + '&limit=' + limit);
  }

  postPackageAssignItemData(data){
      return this.commonService.postData('package/package_assigned_item/', data);
  }

      updatePackageAssignItemData(data, package_id){
      return this.commonService.putData('package/package_assigned_item/?id=' + package_id, data);
  }
  deleteAssignItemPackage(id){
    return this.commonService.deleteData('package/package_assigned_item/?id=' + id );
}



}