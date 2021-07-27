import { Injectable } from '@angular/core';

import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient,
    private commonService: CommonService) { }



       getCouponByPage(pageNumber, limit) {
    return this.commonService.getData('voucher/get_coupon/?page=' + pageNumber + '&limit=' + limit);
  }


  postCoupon(data){
return this.commonService.postData('voucher/coupon/', data);
}

UpdateCoupon(data){
return this.commonService.putData('voucher/coupon/', data);
}

deleteCoupon(id){
return this.commonService.deleteData('voucher/coupon/?id=' + id);
}

getSubtypeData(){
      return this.commonService.getData('business-type/getsubtypebymerchant/');

}

getPurchasedDataByFilters(pageNumber,limit,redeemed,pending,expired,canceled){
      return this.commonService.getData('voucher/get_purchased_coupon_merchant/?page=' + pageNumber + '&limit=' + limit + '&redeemed=' + redeemed + '&pending=' + pending + '&expired=' + expired + '&cancelled=' + canceled);

}

updateStatus(data){
  return this.commonService.putData('voucher/coupon/', data);
}

}
