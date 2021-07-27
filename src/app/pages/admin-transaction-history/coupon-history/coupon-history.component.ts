import { Component, OnInit,TemplateRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from '../../../@core/services/user.service';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@theme/components';
import { TransactionHistoryService } from '../../../@core/services/transaction-history.service'
import { from } from 'rxjs';


@Component({
  selector: 'ngx-coupon-history',
  templateUrl: './coupon-history.component.html',
  styleUrls: ['./coupon-history.component.scss']
})
export class CouponHistoryComponent implements OnInit {


  is_loading = false;
  //For purchse history
  userMessage;
  ispending = 0;
  isredeemed = 0;
  iscancelled = 0;
  isexpired = 0;
  ismerchant_id = 0

  pHistory: number = 1;
  pageSizeHistory: number = 10;
  totalHistory: number = 0;

  purchase_list: any[]
  purchaseobject
  search_by = 0
  search_text = ""
  count = 0
  coupon_id
  coupon_view_list: any[]

  update_coupon_model
  userUpdateCouponForm: FormGroup;

  constructor(
    private dialogService: NbDialogService,
    private transactionHistoryService: TransactionHistoryService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrComponent
  ) {
    this.userUpdateCouponForm = this.fb.group({
      id: ['', Validators.required],
      is_settled: [''],
      is_disputed: [''],
      disputed_reason: [''],
    });
   }

  ngOnInit() {
    // let page_no = 1
    // let url_page = this.route.snapshot.params.page;

    // if (url_page) {
    //   page_no = url_page
    // }
    this.pageChangedCouponHistory(1);

  }
  OnOptionChanged() {
    if (this.search_by == 0) {
      this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory, 0, 0, 0, 0, 0);

    } else if (this.search_by == 1) {
      this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory, 1, 0, 0, 0, 0);
    } else if (this.search_by == 2) {
      this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory, 0, 1, 0, 0, 0);
    } else if (this.search_by == 3) {
      this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory, 0, 0, 1, 0, 0);
    } else if (this.search_by == 4) {
      this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory, 0, 0, 0, 1, 0);
    }
    else if (this.search_by == 5) {
      this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory, 0, 0, 0, 0, 1);
    }
  }

  inSearchChange(search_text) {

    if (this.count === 0) {
      this.pageSizeHistory = 1000;
      this.getCouponPurchaseHistory(1, 1000, this.isredeemed, this.ispending, this.isexpired, this.iscancelled, this.ismerchant_id);

    }

    if (search_text.length > 0) {
      this.count = this.count + 1

      this.purchase_list = this.purchase_list.filter((item) => {
        return (item.buyer_name.toLowerCase().includes(search_text.toLowerCase()) || item.buyer_phone_no.toLowerCase().includes(search_text.toLowerCase()));
      });
    } else {
      this.pageSizeHistory = 10;
      this.count = 0
      this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory, this.isredeemed, this.ispending, this.isexpired, this.iscancelled, this.ismerchant_id);

    }
  }



  pageChangedCouponHistory(newPage: any) {
    this.pHistory = newPage
    this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory, this.isredeemed, this.ispending, this.isexpired, this.iscancelled, this.ismerchant_id);
  }


  getCouponPurchaseHistory(pHistory, pageSizeHistory, redeemed, pending, expired, cancelled, merchant_id) {
    this.is_loading = true;
    this.purchase_list = [] = []

    this.transactionHistoryService.getCouponPurchaseHistorytest(pHistory, pageSizeHistory, redeemed, pending, expired, cancelled, merchant_id).then(
      res => {
        this.is_loading = false;
        if (res['success']) {
          this.purchase_list = res['data']['coupons']
          this.totalHistory = res['data']['count'];
        }
        else {
          this.userMessage = res['description']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {

        console.log(err);
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }

    // update purchased coupn
    openViewUpdatePurchasedCoupon(dialogViewUpdatePurchasedCoupon: TemplateRef<any>,coupon_data) {

      this.coupon_id = coupon_data
      // setTimeout(() => {
      //   this.userUpdateCouponForm.setValue({
      //     id: coupon_id.id,
      //     is_settled: coupon_data.is_settled,
      //     is_disputed: coupon_data.is_disputed,
         
      //   });
      // }, 0);
      this.update_coupon_model = this.dialogService.open(dialogViewUpdatePurchasedCoupon, { closeOnBackdropClick: false });
    }
    addUpdateCoupon(coupon_id) {
      console.log(coupon_id.id,'test id coupon')
      if (this.userUpdateCouponForm.get('is_settled').value == '1') {
        let data = this.userUpdateCouponForm.value
        data.id = coupon_id.id
        data.is_settled = this.userUpdateCouponForm.get('is_settled').value
        data.is_disputed = 0,
        data.disputed_reason = ''
  
      }
      else if (this.userUpdateCouponForm.get('is_settled').value == '0') {
        let data = this.userUpdateCouponForm.value
        data.id = coupon_id.id
        data.is_settled = this.userUpdateCouponForm.get('is_settled').value
        data.is_disputed = 1,
        data.disputed_reason = this.userUpdateCouponForm.get('disputed_reason').value
  
      }
        
        this.is_loading = true
        this.transactionHistoryService.updateCouponData(this.userUpdateCouponForm.value).then(res => {
          if (res['success']) {
            this.is_loading = false
            this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory, 0, 0, 0, 0, 0)
            this.update_coupon_model.close()
            this.userUpdateCouponForm.reset()
            this.toastr.showToast('success', 'success', 'Status Change Success')
          } else {
            this.is_loading = false
            console.log('error')
            this.userMessage = res['description']
            this.toastr.showToast('danger', 'error', this.userMessage)
          }
        }, error => {
          this.is_loading = false
          this.toastr.showToast('danger', 'error', 'Internal Server Error')
          console.log(error)
        })
      }
// view coupon details
openViewcoponData(dialogViewcouponData: TemplateRef<any>,coupon_data) {
  this.coupon_view_list = coupon_data
  this.update_coupon_model = this.dialogService.open(dialogViewcouponData, { closeOnBackdropClick: false });
}



}
