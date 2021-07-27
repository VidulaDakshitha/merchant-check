import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EncriptionService} from './encription.service'

@Injectable({
    providedIn: 'root'
})
export class MerchantTransactionHistoryService {
   constructor(private http: HttpClient,
        private commonService: CommonService, private encryption: EncriptionService) { }


//package services

    getAllTransactionsByPage(pageNumber, limit, condition ) {
    return this.commonService.getData('transaction/get_all_merchant_transaction_history/?page=' + pageNumber + '&limit=' + limit + condition);
  }

     getTransactionDataById(id) {
    return this.commonService.getData('transaction/get_by_id_merchant_transaction_history/?id=' +id);
  }




}