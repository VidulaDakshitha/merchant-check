import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QrGenerateService {

    constructor(private http: HttpClient,
        private commonService: CommonService) { }

    addGenerateQrcode(data) {
        return this.commonService.postData('user/merchant/generate-qr/', data);
    }
}
