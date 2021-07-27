import { Injectable } from '@angular/core';
import { CommonService} from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChequeManageService {

  constructor(private http: HttpClient,
    private commonService: CommonService) { }

    postChequeBook(data){
      return this.commonService.postData('transaction/create_cheque_book/', data);
  }
  getAllChequeBook(pageNumber, limit){
    return this.commonService.getData('transaction/get_cheque_book/?page=' + pageNumber +'&limit=' + limit);
}

getAllChequeBookById(pageNumber, limit, cheque_id){
    return this.commonService.getData('transaction/get_cheque_book/?page=' + pageNumber +'&limit=' + limit + '&cheque_id=' + cheque_id);
}
//issue cheque
postIssueCheque(data){
  return this.commonService.postData('transaction/issue_cheque/', data);
}
getCheqeIdByBank(bank_id) {
  return this.commonService.getData('transaction/check_cheque_book/?bank_id=' + bank_id);
}
getIssueChequeData(pageNumber, limit){
  return this.commonService.getData('transaction/get_issue_cheque/?page=' + pageNumber +'&limit=' + limit);
}
getIssueChequeDataByChequeId(pageNumber, limit, cheque_id){
  return this.commonService.getData('transaction/get_issue_cheque/?page=' + pageNumber +'&limit=' + limit + '&cheque_id=' + cheque_id);
}
updateIssueChequeData(data){
  return this.commonService.putData('transaction/issue_cheque/', data);
}




//receive cheque
getReceiveChequeData(pageNumber, limit,is_returned){
  return this.commonService.getData('transaction/merchant-cheque-deposit/?page=' + pageNumber +'&limit=' + limit +'&is_returned=' + is_returned);
}

getReceiveChequeDataByDate(pageNumber, limit, start_date,end_date,is_returned){
  return this.commonService.getData('transaction/merchant-cheque-deposit/?page=' + pageNumber +'&limit=' + limit + '&start_date=' + start_date+ '&end_date=' + end_date+'&is_returned=' + is_returned);
}

getReceiveChequeDataByChequeId(pageNumber, limit, cheque_id,is_returned){
  return this.commonService.getData('transaction/merchant-cheque-deposit/?page=' + pageNumber +'&limit=' + limit + '&cheque_id=' + cheque_id+'&is_returned=' + is_returned);
}
updateReceiveChequeData(data){
  return this.commonService.putData('transaction/merchant-cheque-deposit/', data);
}
postReceiveChequeData(data){
  return this.commonService.postData('transaction/merchant-cheque-deposit/', data);
}
updateReceiveChequeReturnData(data){
  return this.commonService.postData('transaction/return-deposit-cheque/', data);
}



}
