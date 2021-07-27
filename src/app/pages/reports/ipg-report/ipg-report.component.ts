import { Component } from '@angular/core';
import { ReportService } from '../../../@core/services/reports.services';
import { ToastrComponent } from '../../../@theme/components';
import * as moment from 'moment'

@Component({
  selector: 'ngx-ipg-report',
  templateUrl: './ipg-report.component.html',
  styleUrls: ['./ipg-report.component.scss']
})
export class IpgReportComponent {
  start_date: any
  end_date: any
  email = ""
  type = ""
  title = "Ipg Transaction Report"
  description = ""
  isLoading = false
  is_assigned_batch =false
  is_approve = false
  

  items = [];
  headers =
  [
    { "head": "ID", key: "id", selected: true, fixed: true },
    { "head": "Ipg Transaction Id", key: "ipg_transaction_id", selected: false, fixed: false },
    { "head": "Onepay Transaction ID", key: "onepay_transaction_id", selected: true, fixed: true },
    { "head": "MID", key: "mid", selected: false, fixed: false },
    { "head": "Request Amount", key: "request_amount", selected: true, fixed: true },
    { "head": "Charge (LKR)", key: "charge", selected: false, fixed: false },
    { "head": "Discount (LKR)", key: "discount", selected: false, fixed: false },
    { "head": "Net Amount (LKR)", key: "net_amount", selected: false, fixed: false },
    { "head": "Request Type", key: "request_type", selected: false, fixed: false },
    { "head": "Request From", key: "request_from", selected: false, fixed: false },
    { "head": "Date and Time", key: "response_time", selected: true, fixed: true },
    { "head": "Transaction Status", key: "transaction_status", selected: true, fixed: true },
    { "head": "Transaction", key: "transaction", selected: false, fixed: false },
    { "head": "Status", key: "status", selected: true, fixed: true },
    { "head": "Approve", key: "is_approved", selected: false, fixed: false },
    { "head": "Assigned Batch", key: "is_assigned_batch", selected: false, fixed: false },
    { "head": "Merchant Id", key: "merchant_id", selected: false, fixed: false },
    { "head": "Type", key: "type", selected: false, fixed: false },
    { "head": "Account Name", key: "account_holder_name", selected: false, fixed: false },
    { "head": "Account No", key: "account_no", selected: false, fixed: false },
    { "head": "Branch", key: "branch", selected: false, fixed: false },
    { "head": "Bank Name", key: "bank_name", selected: false, fixed: false },
    { "head": "Bank Code", key: "bank_code", selected: false, fixed: false },
    { "head": "Merchant Business_name", key: "merchant_business_name", selected: false, fixed: false },
    { "head": "Merchant Email", key: "merchant_email", selected: true, fixed: true },
    { "head": "Merchant Phone No", key: "merchant_phone_no", selected: false, fixed: false },
    { "head": "Merchant Package", key: "package_name", selected: false, fixed: false }

  ]

constructor(private toastr: ToastrComponent, private reportService: ReportService) {
}

search_data() {
  this.items = []
  console.log(this.start_date,'this.start_date')
  console.log(this.end_date,'this.end_date')
  console.log(this.type,'this.type')
  console.log(this.is_assigned_batch,'this.is_assigned_batch')
  console.log(this.is_approve,'this.is_approve')
  
  if (!this.start_date || !this.end_date || !this.type) {
    this.toastr.showToast('danger', 'error', 'Oh Snap! - Invalid search parameters, please check parameters again')
    return;
  }


  this.description = "Report for " + this.start_date + " to " + this.end_date

  this.isLoading = true

  let request = {
    start_date: moment(this.start_date).format('YYYY-MM-DD H:mm:ss'),
    end_date: moment(this.end_date).format('YYYY-MM-DD H:mm:ss'),
    transaction_type: this.type,
    is_assigned_batch:this.is_assigned_batch,
    is_approve:this.is_approve

  }
  if (this.email){
    console.log(this.email,'email')
    request["merchant_email"] = this.email
   }
  console.log(request,'request')

  this.reportService.getIpgReportTransaction(request).then(res => {
    console.log(res,'res')
    this.isLoading = false
    if (res['status'] == 100) {
      if (res['data'].length) {
        this.items = res['data'];
        
      } else {
        this.items = []
      }
    }
    else {
      this.items = []
    }
  },
    err => {
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    }
  )

}

filterApprovedTransaction() {
  // console.log(this.is_approve)
 
}
filterAssignedBatch() {

}

}
