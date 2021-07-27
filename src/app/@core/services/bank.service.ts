import { Injectable } from '@angular/core';
import { CommonService} from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient,
    private commonService: CommonService) { }

    getBank(page,limit) {
        return this.commonService.getData('bank/?page='+page+'&limit'+limit);
    }
    postBankData(data){
        return this.commonService.postData('bank/', data);
    }
    updateBankData(data, bank_id){
        return this.commonService.putData('bank/?id=' + bank_id, data);
    }
    deleteBank(id){
      return this.commonService.deleteData('bank/?id=' + id );
    }
}
