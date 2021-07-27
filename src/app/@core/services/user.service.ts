import { Injectable, Output, EventEmitter } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    @Output() getLoggedInStatus: EventEmitter<any> = new EventEmitter();

    constructor(private commonService: CommonService) { }

    admin_login(data) {
        return this.commonService.postData('user/login_admin/', data);
    }

    merchant_login(data) {
        return this.commonService.postData('user/merchant_login/', data);
        
    }
    getMerchantFullViewnew(){
        return this.commonService.getData('merchant/pdf_creation/');
    }
    // unautharized get
    getBusinessCategoryUnautharized(){
        return this.commonService.getData('business-cat/get_category_unauthorized/');
    }
    getBusinessTypeUnautharized(){
        return this.commonService.getData('business-type/get_type/');
    }
    getBankUnautharized(){
        return this.commonService.getData('bank/get_bank/');
    }
    // duplicate phone number
    duplicat_phone_number(data) {
        return this.commonService.postData('merchant/phone_number_duplicate_check/', data);
        
    }
      // duplicate email
      duplicat_email(data) {
        return this.commonService.postData('merchant/email_duplicate_check/', data);   
    }
    // get package details
    getPackageDetails(id){
        return this.commonService.getData('package/get_package_requested_details/?id=' + id);
    }


    ///////////////////////////////////////////////////////////////////////////////////// admin new
    // get merchant
    getMerchant(pageNumber, limit){
        return this.commonService.getData('merchant/merchant_admin/?page=' + pageNumber + '&limit=' + limit);
    }
    getMerchantDetailsView(id){
        return this.commonService.getData('merchant/merchant_full_basic_data/?id=' + id);
    }
     // admin-merchant basic data
    updateMerchantBasicData(data){
        return this.commonService.putData('merchant/merchant_admin/', data );
    }
    //get business type
    getBusinessCatMerchant(){
        return this.commonService.getData('business-cat/get_category/');
    }
    getBusinessTypeMerchant(){
        return this.commonService.getData('business-type/');
    }
    getBankData(){
     
        return this.commonService.getData('bank/get_bank/');
        // return this.commonService.getData('bank/');
    }
    // get document
    getMerchanDocument(id){
        return this.commonService.getData('merchant/merchant_document_data/?id=' + id);
    }
    // document approval
    updatedocumentApprovalData(data){
        return this.commonService.postData('merchant/merchant_document_admin_approval/', data);
    }
    //All document approval
    updatedocumentApprovalAll(data){
        return this.commonService.putData('merchant/doc_approval/', data );
    }
   
    // request new document
    requestDoc(data) {
        return this.commonService.postData('merchant/request_merchant_doc_upload/', data);
        
    }
    // Submit document all
    uploadAllDocument(data) {
        return this.commonService.postData('merchant/merchant_doc_upload/', data);
        
    }
    // get hard copyes
    getHardCopy(id){
        return this.commonService.getData('merchant/hard_copy/?id=' + id);
    }
    // add hard copy
    addHardcopy(data) {
        return this.commonService.postData('merchant/hard_copy/', data);
        
    }
    //update hard copy
    updatetHardcopylData(id,data){
        return this.commonService.putData('merchant/hard_copy/?id=' + id, data );
    }
    // basic data approval
    updateBasicData(id,data){
        return this.commonService.putData('merchant/basic_data_approval/?id=' + id, data );
    }

    // merchant document processing
    // document get
    getMerchantDocument(){
        return this.commonService.getData('merchant/get_document_data/');
    }
    // update file
    addFile(data) {
        return this.commonService.postData('merchant/document_update/', data);
    }
    // get requested package info
    getrequestedpackageinfo(id){
        return this.commonService.getData('package/get_requested_package_info/?merchant_id=' + id);
    }
    // approve requested package
    approvePackage(data) {
        return this.commonService.postData('package/approve_requested_package/', data);
    }
    //initial payment fee
    addInitialPayment(data) {
        return this.commonService.postData('merchant/request_initial_payment/', data);
    }
    // get customized items by merchant
    getCutomizedItemByMerchant(id){
        return this.commonService.getData('package/get_merchant_customize_item/?merchant_id=' + id);
    }
    // get customized items
    geCutomizedItem(){
        return this.commonService.getData('package/get_customizable_items/');
    }
    // update customize package items
    addCustomizedItem(data){
        return this.commonService.postData('package/add_merchant_customize_item/', data );
       
    }
    // get package payment
    getPackagepayment(id){
        return this.commonService.getData('package/package_payment/?user_id=' + id);
    }
    // update customized item
    updatetCustomizeData(id,data){
        return this.commonService.putData('package/update_merchant_customize_item/?id=' + id, data );
    }
    //get_package_and_payment_detail
    getPackageInfoAndPaymentInfo(id){
        return this.commonService.getData('package/get_package_and_payment_detail/?merchant_id=' + id);
    }
    // get all package
    getPackageInfo(){
        return this.commonService.getData('package/get_package/');
    }
    // get subscription package
    getSubscriptionPackage(){
        return this.commonService.getData('package/get_merchant_package_detail/');
    }
       getSubscriptionPackageDetails(){
        return this.commonService.getData('package/subscription_details/');
    }

    getSubscriptionPackageStatus(){
        return this.commonService.getData('package/get_merchant_package_status/');
    }
    // package payment
    postPackagePaymentData(data){
        return this.commonService.postData('package/package_payment/', data);
    }
    // admin-package change
    postUpdatePackage(data){
        return this.commonService.postData('package/request_package/', data);
    }

    // new admin user
    //reset password-after merchant onbording
    verifyMerchantData(data){
        return this.commonService.postData('user/rest_new_password/', data);
    }
    // resent email
    postresentEmailData(data){
        return this.commonService.postData('merchant/resend_email/', data);
    }


     //merchant reset password
     getOtp(phone_number){
        return this.commonService.getData('user/reset-password-request/?phone_number=' + phone_number );
    }
    postPwResetOtpData(data){
        return this.commonService.postData('user/reset-password-verify/', data);
    }
    postPwResetData(data){
        return this.commonService.postData('user/reset-password/', data);
    }
    getPdf(){
        return this.commonService.getData('merchant/get_merchant_application/');
    }




































//merchant
    add_merchant(data) {
        return this.commonService.postData('merchant/merchant/', data);
    }
    getMerchantAll(pageNumber, limit){
        return this.commonService.getData('merchant/get_all_merchant/?page=' + pageNumber + '&limit=' + limit);
    }
    getMerchantById(pageNumber, limit, id){
        return this.commonService.getData('merchant/get_all_merchant/?page=' + pageNumber + '&limit=' + limit + '&id=' + id);
    }
    getMerchantByBusinessName(pageNumber, limit, registered_business_name){
        return this.commonService.getData('merchant/get_all_merchant/?page=' + pageNumber + '&limit=' + limit + '&registered_business_name=' + registered_business_name);
    }
    getMerchantByRegisterNumber(pageNumber, limit, register_number){
        return this.commonService.getData('merchant/get_all_merchant/?page=' + pageNumber + '&limit=' + limit + '&register_number=' + register_number);
    }
    getMerchantByEmail(pageNumber, limit, email){
        return this.commonService.getData('merchant/get_all_merchant/?page=' + pageNumber + '&limit=' + limit + '&email=' + email);
    }
    getMerchantByPhoneNumber(pageNumber, limit, phone_number){
        return this.commonService.getData('merchant/get_all_merchant/?page=' + pageNumber + '&limit=' + limit + '&phone_number=' + phone_number);
    }
    getMerchantFullView(id){
        return this.commonService.getData('merchant/get_full_merchant/?id=' + id);
    }
    //service provider
    getServiceProvider() {
        return this.commonService.getData('merchant/service_provider_details/');
    }
    postServiceProviderData(data){
        return this.commonService.postData('merchant/service_provider_details/', data);
    }
    updateServiceProviderData(data){
        return this.commonService.putData('merchant/service_provider_details/', data );
    }

    // merchant data update

    updateMerchantData(data){
        return this.commonService.putData('merchant/update_merchant/', data );
    }
    // category
    getBusinessCategory(page, limit) {
        return this.commonService.getData('business-cat/?page=' + page + '&limit=' + limit);
    }

    postCategoryData(data){
        return this.commonService.postData('business-cat/', data);
    }

    updateBCategoryData(data, btype_id){
        return this.commonService.putData('business-cat/?id=' + btype_id, data );
    }

    deleteBCategory(btype_id){
        return this.commonService.deleteData('business-cat/?id=' + btype_id );
    }
    //type
    getBusinessType(page, limit) {
        return this.commonService.getData('business-type/?page=' + page + '&limit' + limit);
    }
    updateBTypeData(data, btype_id){
        return this.commonService.putData('business-type/?id=' + btype_id, data );
    }
    deleteBType(id){
        return this.commonService.deleteData('business-type/?id=' + id );
    }

    postTypeData(data){
        return this.commonService.postData('business-type/', data);
    }
    getBank(page, limit) {
        return this.commonService.getData('bank/get-bank/?page=' + page + '&limit' + limit);
    }
    deleteMerchantData(merchant_id){
        return this.commonService.deleteData('merchant/delete_merchant/?merchant_id=' + merchant_id );
    }
    updateMerchantEmailData(data){
        return this.commonService.putData('user/user_change-email/', data );
    }
    postApprovalData(data){
        return this.commonService.postData('user/merchant_approval/', data);
    }
    //subtype
    getSubtypeById(id){
        return this.commonService.getData('business-type/subtype/?id=' + id);
    }
    deleteSubtypeData(id){
        return this.commonService.deleteData('business-type/subtype/?id=' + id );
    }
    updateSubtypeData(data){
        return this.commonService.putData('business-type/subtype/', data );
    }
    postsubtypeData(data){
        return this.commonService.postData('business-type/subtype/', data);
    }
    postNewSubtype(data){
        return this.commonService.postData('merchant/assigned_subtype_to_merchant/', data);
        // return this.commonService.postData('', data);
    }




    //admin user
    getAdminAll(pageNumber, limit){
        return this.commonService.getData('user/get_all_admin/?page=' + pageNumber + '&limit=' + limit);
    }
    postAdminUserData(data){
        return this.commonService.postData('user/admin/admin-user/', data);
    }
    updateAdminData(data, id){
        return this.commonService.putData('user/update_admin/?admin_id=' + id, data);
    }

    verifyMerchant(data){
        return this.commonService.postData('user/rest_new_password/', data);
    }
    updateAdminEmailData(data){
        return this.commonService.putData('user/admin_change-email/', data );
    }
    deleteAdminData(admin_id){
        return this.commonService.deleteData('user/delete_admin/?admin_id=' + admin_id );
    }
    postUserActivation(data){
        return this.commonService.postData('user/merchant_unlocked/', data);
    }
   
    //digital user

    getDigitalUserAll(pageNumber, limit){
        return this.commonService.getData('digital_user/getdigitalusers/?page=' + pageNumber + '&limit=' + limit);
    }
    getDigitalUserById(pageNumber, limit, id){
        return this.commonService.getData('digital_user/getdigitalusers/?page=' + pageNumber + '&limit=' + limit + '&id=' + id);
    }
    getDigitalUserByRegisterNumber(pageNumber, limit, register_number){
        return this.commonService.getData('digital_user/getdigitalusers/?page=' + pageNumber + '&limit=' + limit + '&register_number=' + register_number);
    }
    getDigitalUserByEmail(pageNumber, limit, email){
        return this.commonService.getData('digital_user/getdigitalusers/?page=' + pageNumber + '&limit=' + limit + '&email=' + email);
    }
    getDigitalUserByPhoneNumber(pageNumber, limit, phone_number){
        return this.commonService.getData('digital_user/getdigitalusers/?page=' + pageNumber + '&limit=' + limit + '&phone_number=' + phone_number);
    }
    postDigitalUserApprovedData(data){
        return this.commonService.postData('digital_user/digitaluserapprove/', data);
    }
    deletegigitalUser(id){
        return this.commonService.deleteData('digital_user/delete_user/?id=' + id );
    }
    //merchant profile
    getMerchantProfileDetails(){
        return this.commonService.getData('merchant/get_merchant_details/');
    }
    updateUserData(data){
        return this.commonService.putData('merchant/update_merchant_details/', data );
    }

    self_register_merchant(data){

     
        return this.commonService.postData('merchant/self_reg_merchant/', data);
    }

}
