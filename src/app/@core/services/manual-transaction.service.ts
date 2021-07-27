import { Injectable } from '@angular/core';
import { CommonService} from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManualTransactionService {

  constructor(private http: HttpClient,
    private commonService: CommonService) { }

    // getManualTransactionData(pageNumber, limit){
    //     return this.commonService.getData('transaction/merchant-get-all-cheque/?page=' + pageNumber +'&limit=' + limit);
    // }

    // getManualTransactionDataByDate(pageNumber, limit, start_date,end_date){
    //     return this.commonService.getData('transaction/merchant-get-all-cheque/?page=' + pageNumber +'&limit=' + limit + '&start_date=' + start_date+ '&end_date=' + end_date);
    // }

    postManualTransactionData(data){
      return this.commonService.postData('transaction/merchant-create-all-manual-transaction/', data);
  }
  //   updateManualTransactionData(data){
  //     return this.commonService.putData('transaction/merchant-cheque-deposit/', data);
  // }
  postManualTransactionSummaryData(data){
    return this.commonService.postData('transaction/merchant-manual-transaction/', data);
}
}
