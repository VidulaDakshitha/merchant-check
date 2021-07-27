import { Injectable } from '@angular/core';

import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient,
    private commonService: CommonService) { 

    }

     getVoucherByPage(pageNumber, limit) {
    return this.commonService.getData('voucher/get_voucher/?page=' + pageNumber + '&limit=' + limit);
  }


  postVoucher(data){
return this.commonService.postData('voucher/voucher/', data);
}

UpdateVoucher(data){
return this.commonService.putData('voucher/voucher/', data);
}

deleteVoucher(id){
return this.commonService.deleteData('voucher/voucher/?id=' + id);
}


}


 

