import { Injectable } from '@angular/core';
import { CommonService} from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MerchantProfileService {

  constructor(private http: HttpClient,
    private commonService: CommonService) { }

    getMerchant() {
        return this.commonService.getData('merchant/merchant_full_data_get/');
    }

     getCoordinates(url,key) {
        return this.commonService.getDataWithoutEncrypt('https://maps.googleapis.com/maps/api/geocode/json?address='+url+'&key='+key);
    }

    updateProfilePic(data){
          return this.commonService.putData('merchant/merchant_profile_data_update/', data);
    }

    updateUserData(data)
    {
      
    }

}
