import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
    private commonService: CommonService) { }

  loadTotalSales(year) {
    return this.commonService.getChartData('transaction/merchant-get-all-sales-year/?year=' + year);
  }
  lastQrSale() {
    return this.commonService.getData('transaction/last_qr_sale/');
  }
  yesterdaySale() {
    return this.commonService.getData('transaction/yesterday_total_amount/');
  }
  todayMatureCqAmount() {
    return this.commonService.getData('transaction/today_mature_cheque_amount/');
  }
  // calender
  calenderMaturedChequeDetails() {
    return this.commonService.getData('transaction/calender_data/');
  }
  // event
  addEventData(data){
    return this.commonService.postData('merchant/save_comment/', data);
}
  getEventData() {
    return this.commonService.getData('merchant/save_comment/');
}
updateEventData(data, id){
  return this.commonService.putData('merchant/save_comment/?id=' + id, data);
}

// updateEventData(id,data){
//   return this.commonService.putData('merchant/save_comment/?id=' + id, data);
// }
deleteEventData(id){
  return this.commonService.deleteData('merchant/save_comment/?id=' + id );
}
  
}
