import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PushPaymentService {

    constructor(private http: HttpClient,
        private commonService: CommonService) { }

    // shedul push payment
    addshedulPaymentData(data) {
        return this.commonService.postData('merchant/schedule_payment/', data);
    }
    getShedulData(pageNumber, limit) {
        return this.commonService.getData('merchant/schedule_payment/?page=' + pageNumber + '&limit=' + limit);
    }
    updateShedulPaymentData(data, id) {
        return this.commonService.putData('merchant/schedule_payment/?id=' + id, data);
    }
    deleteShedulData(id) {
        return this.commonService.deleteData('merchant/schedule_payment/?id=' + id);
    }

    // real time push payment collection type
    addCollectionTypeData(data) {
        return this.commonService.postData('merchant/push_payment_collections_type/', data);
    }
    getCollectionTypeData() {
        return this.commonService.getData('merchant/push_payment_collections_type/');
    }
    updateCollectionTypeData(data) {
        return this.commonService.putData('merchant/push_payment_collections_type/', data);
    }
    deleteCollectionTypeData(id) {
        return this.commonService.deleteData('merchant/push_payment_collections_type/?id=' + id);
    }

    // real time push payment collection
    addCollectionData(data) {
        return this.commonService.postData('merchant/push_payment_collections/', data);
    }
    getCollectionData(pageNumber, limit,id) {
        return this.commonService.getData('merchant/push_payment_collections/?page=' + pageNumber + '&limit=' + limit + '&id=' + id);
    }
    updateCollectionData(data) {
        return this.commonService.putData('merchant/push_payment_collections/', data);
    }
    deleteCollectionData(id) {
        return this.commonService.deleteData('merchant/push_payment_collections/?id=' + id);
    }

    //get user details
    getUserData(phone_no){
        return this.commonService.getData('merchant/search_details/?phone_no=' + phone_no);
    }
    //payment
    paymentData(data) {
        return this.commonService.postData('merchant/sent_payment_details/', data);
    }
    getPaymentHistory(pageNumber, limit){
        return this.commonService.getData('merchant/get_payment_details/?page=' + pageNumber +'&limit=' + limit);
    }

    getPaymentHistoryByPhoneNumber(pageNumber, limit, phone_number){
        return this.commonService.getData('merchant/get_payment_details/?page=' + pageNumber +'&limit=' + limit + '&phone_number=' + phone_number);
    }
    getPaymentHistoryById(pageNumber, limit, id){
        return this.commonService.getData('merchant/get_payment_details/?page=' + pageNumber +'&limit=' + limit + '&id=' + id);
    }


}
