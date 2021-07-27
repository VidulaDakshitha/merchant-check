import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PaymentGatewayService {

    constructor(private http: HttpClient,
        private commonService: CommonService) { }

    // shedul push payment
    addIpgUserData(data) {
        return this.commonService.postData('', data);
    }
    updateViewPasswordData(data){
        return this.commonService.putData('', data );
    }

    
}
