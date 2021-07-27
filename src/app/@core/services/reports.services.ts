import { Injectable } from '@angular/core';
import { CommonService} from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EncriptionService} from './encription.service'


@Injectable({
  providedIn: 'root'
})
export class ReportService {
 constructor(private http: HttpClient,
      private commonService: CommonService, private encryption: EncriptionService) { }


  // getIpgReportTransaction(page, limit,merchant_email,start_date, end_date,transaction_type,is_assigned_batch,is_approve){
  //   return this.commonService.getData('ipg/admin/history/?page='+ page +'&limit='+ limit + '&start_date=' + start_date +'&end_date=' + end_date + '&is_approve=' + is_approve +'&transaction_type=' + transaction_type +'&is_assigned_batch=' + is_assigned_batch+'&merchant_email='+merchant_email)
  // }
  getIpgReportTransaction(data){
    return this.commonService.postData('ipg/admin/history/', data)
  }

  
}