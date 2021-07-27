import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomTransactionService {

    constructor(private http: HttpClient,
        private commonService: CommonService) { }
    //question
    getquestionAllData(pageNumber, limit) {
        return this.commonService.getData('merchant/get_question_by_page/?page=' + pageNumber + '&limit=' + limit);
    }
    postDigitalUserApprovedData(data){
        return this.commonService.postData('merchant/question/', data);
    }
    updateQuestionData(data){
        return this.commonService.putData('merchant/question/', data );
    }
    deleteMerchantData(id){
        return this.commonService.deleteData('merchant/question/?id=' + id );
    }
    // answer
    getAnswerDataById(id) {
        return this.commonService.getData('merchant/get_answer/?id=' + id);
    }
    updateAnswerData(data){
        return this.commonService.putData('merchant/answer/', data );
    }
    deleteAnswerData(id){
        return this.commonService.deleteData('merchant/answer/?id=' + id );
    }
    postAnswerData(data){
        return this.commonService.postData('merchant/answer/', data);
    }
}


// import { Injectable } from '@angular/core';
// import { CommonService } from './common.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';


// @Injectable({
//     providedIn: 'root'
// })
// export class CustomTransactionService {

//     constructor(private http: HttpClient,
//         private commonService: CommonService) { }

//     // real time push payment collection
//     addquestionData(data) {
//         return this.commonService.postData('merchant/question/', data);
//     }
//     getquestionAllData(pageNumber, limit) {
//         return this.commonService.getData('merchant/get_question_by_page/?page=' + pageNumber + '&limit=' + limit);
//     }
//     getquestionDataById(id) {
//         return this.commonService.getData('merchant/get_answer/?id=' + id);
//     }
//     updatequestionData(data) {
//         return this.commonService.putData('merchant/question/', data);
//     }
//     deletequestionData(id) {
//         return this.commonService.deleteData('merchant/question/?id=' + id);
//     }

// }
