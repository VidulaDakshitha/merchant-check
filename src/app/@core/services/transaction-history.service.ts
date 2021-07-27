import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {

  constructor(private http: HttpClient,
    private commonService: CommonService) { }
  //loro transaction
  getTransactionHistory(pageNumber, limit) {
    return this.commonService.getData('transaction/loro-transaction-history/?page=' + pageNumber + '&limit=' + limit);
  }

  getTransactionHistoryByTransactionId(pageNumber, limit, transaction_id) {
    return this.commonService.getData('transaction/loro-transaction-history/?page=' + pageNumber + '&limit=' + limit + '&transaction_id=' + transaction_id);
  }
  //onepay transaction
  getTransactionHistoryOnepay(pageNumber, limit) {
    return this.commonService.getData('transaction/qr-transaction-history/?page=' + pageNumber + '&limit=' + limit);
  }

  getTransactionHistoryOnepayByTransactionId(pageNumber, limit, transaction_id) {
    return this.commonService.getData('transaction/qr-transaction-history/?page=' + pageNumber + '&limit=' + limit + '&transaction_id=' + transaction_id);
  }

  // manual transaction
  getManualTransactionHistory(pageNumber, limit) {
    return this.commonService.getData('transaction/merchant-manual-transaction/?page=' + pageNumber + '&limit=' + limit);
  }

  getManualTransactionHistoryByTransactionDate(pageNumber, limit, start_date, end_date) {
    return this.commonService.getData('transaction/merchant-manual-transaction/?page=' + pageNumber + '&limit=' + limit + '&start_date=' + start_date + '&end_date=' + end_date);
  }
  updateManualTransactionData(data) {
    return this.commonService.putData('transaction/merchant-manual-transaction/', data);
  }
  deleteManualTransaction(id) {
    return this.commonService.deleteData('transaction/merchant-manual-transaction-delete/?transaction_id=' + id);
  }


  postRefundData(data) {
    return this.commonService.postData('/transaction/merchant-cancellation-qr-transaction', data);
  }

  // institute Payment
  getInstitutePaymentHistory(pageNumber, limit) {
    return this.commonService.getData('merchant/get_institute_payment_details/?page=' + pageNumber + '&limit=' + limit);
  }

  getInstitutePaymentHistoryByPhoneNumber(pageNumber, limit, phone_number) {
    return this.commonService.getData('merchant/get_institute_payment_details/?page=' + pageNumber + '&limit=' + limit + '&phone_number=' + phone_number);
  }
  getInstitutePaymentHistoryById(pageNumber, limit, id) {
    return this.commonService.getData('merchant/get_institute_payment_details/?page=' + pageNumber + '&limit=' + limit + '&id=' + id);
  }
  getInstitutePaymentHistoryByCollectionId(pageNumber, limit, collectiontype_id) {
    return this.commonService.getData('merchant/get_institute_payment_details_by_collection_type/?page=' + pageNumber + '&limit=' + limit + '&collectiontype_id=' + collectiontype_id);
  }

   //transaction summary All
   getSummaryAllTransactionHistoryByTransactionDate(pageNumber, limit, start_date, end_date) {
    return this.commonService.getData('transaction/merchant-transaction-summary/?page=' + pageNumber + '&limit=' + limit + '&start_date=' + start_date + '&end_date=' + end_date);
  }
  //custom transaction history
  getCustonTransactionHistory(pageNumber, limit) {
    return this.commonService.getData('custom_transaction/get_transaction/?page=' + pageNumber + '&limit=' + limit);
  }
  getCustonTransactionHistoryByPhoneNumber(pageNumber, limit, phone_no) {
    return this.commonService.getData('custom_transaction/get_transaction/?page=' + pageNumber + '&limit=' + limit + '&phone_no=' + phone_no);
  }
  getCustonTransactionHistoryByRefNo(pageNumber, limit, ref_no) {
    return this.commonService.getData('custom_transaction/get_transaction/?page=' + pageNumber + '&limit=' + limit + '&ref_no=' + ref_no);
  }
  getCustonTransactionHistoryByRefNoOnepay(pageNumber, limit, onepay_ref_no) {
    return this.commonService.getData('custom_transaction/get_transaction/?page=' + pageNumber + '&limit=' + limit + '&onepay_ref_no=' + onepay_ref_no);
  }
  // admin copon transaction history
  getCouponTransactionHistory(pageNumber, limit,redeemed,pending,expired,cancelled,merchant_id) {
    return this.commonService.getData('voucher/get_purchased_coupon_admin/?page=' + pageNumber + '&limit=' + limit + '&redeemed=' + redeemed + '&pending=' + pending + '&expired=' + expired + '&cancelled=' + cancelled + '&merchant_id=' + merchant_id);
  }
  getCouponTransactionHistoryByRedeemed(pageNumber, limit,redeemed,pending,expired,cancelled,merchant_id) {
    return this.commonService.getData('voucher/get_purchased_coupon_admin/?page=' + pageNumber + '&limit=' + limit + '&redeemed=' + redeemed + '&pending=' + pending + '&expired=' + expired + '&cancelled=' + cancelled + '&merchant_id=' + merchant_id);
  }
  getCouponTransactionHistoryByPending(pageNumber, limit,redeemed,pending,expired,cancelled,merchant_id) {
    return this.commonService.getData('voucher/get_purchased_coupon_admin/?page=' + pageNumber + '&limit=' + limit + '&redeemed=' + redeemed + '&pending=' + pending + '&expired=' + expired + '&cancelled=' + cancelled + '&merchant_id=' + merchant_id);
  }
  getCouponTransactionHistoryByExpired(pageNumber, limit,redeemed,pending,expired,cancelled,merchant_id) {
    return this.commonService.getData('voucher/get_purchased_coupon_admin/?page=' + pageNumber + '&limit=' + limit + '&redeemed=' + redeemed + '&pending=' + pending + '&expired=' + expired + '&cancelled=' + cancelled + '&merchant_id=' + merchant_id);
  }
  getCouponTransactionHistoryByCancelled(pageNumber, limit,redeemed,pending,expired,cancelled,merchant_id) {
    return this.commonService.getData('voucher/get_purchased_coupon_admin/?page=' + pageNumber + '&limit=' + limit + '&redeemed=' + redeemed + '&pending=' + pending + '&expired=' + expired + '&cancelled=' + cancelled + '&merchant_id=' + merchant_id);
  }
  getCouponTransactionHistoryById(pageNumber, limit,redeemed,pending,expired,cancelled,merchant_id) {
    return this.commonService.getData('voucher/get_purchased_coupon_admin/?page=' + pageNumber + '&limit=' + limit + '&redeemed=' + redeemed + '&pending=' + pending + '&expired=' + expired + '&cancelled=' + cancelled + '&merchant_id=' + merchant_id);
  }


  getCouponPurchaseHistorytest(pageNumber, limit,redeemed,pending,expired,cancelled,merchant_id) {
    return this.commonService.getData('voucher/get_purchased_coupon_admin/?page=' + pageNumber + '&limit=' + limit + '&redeemed=' + redeemed + '&pending=' + pending + '&expired=' + expired + '&cancelled=' + cancelled + '&merchant_id=' + merchant_id);
  }
  updateCouponData(data){
    return this.commonService.putData('voucher/update_purchased_coupon/', data );
}
  

}
