import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../@core/services/user.service';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@theme/components';
@Component({
  selector: 'ngx-pending-merchants',
  templateUrl: './pending-merchants.component.html',
  styleUrls: ['./pending-merchants.component.scss']
})
export class PendingMerchantsComponent implements OnInit {

  p: number = 1;
  total: number = 0;
  pageSize: number = 10;
  userMessage
  merchant_details = [] = []
  is_loading = false

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private toastr: ToastrComponent,
  ) { }

  ngOnInit() {
    let page_no = 1
    let url_page = this.route.snapshot.params.page;

    if (url_page) {
      page_no = url_page
    }

    this.pageChangedMerchant(1)
  }
  pageChangedMerchant(newPage: any) {
    console.log('merchant')
    this.p = newPage
    this.getMerchantData(this.p, this.pageSize);
  }
  getMerchantData(p, pageSize){
  this.userService.getMerchant(p, pageSize).then(
    res => {
      this.is_loading = false
     
      if (res['status'] == 100) {
        console.log(res['data'],'wow')

        this.merchant_details = res['data']['data'];
        this.total = res['data']['limit'];
      }
      else {

        this.userMessage = res['description']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    },
    err => {
      this.is_loading = false
      console.log(err);
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    }
  );
}

}
