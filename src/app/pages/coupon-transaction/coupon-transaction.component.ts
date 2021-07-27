import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { CouponService } from '../../@core/services/coupon.service';
import { ToastrComponent } from '../../@theme/components';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-coupon-transaction',
  templateUrl: './coupon-transaction.component.html',
  styleUrls: ['./coupon-transaction.component.scss']
})
export class CouponTransactionComponent implements OnInit {

  is_loading = false;
  //For purchse history
   userMessage;
  ispending=0;
  isredeemed=0;
  iscancelled=0;
  isexpired=0;

      pHistory: number = 1;  
      pageSizeHistory: number = 10;
      totalHistory: number = 0;

  purchase_list: any[]
    purchaseobject
   search_by = 0
   search_text=""
   count=0
   purchaseCouponWording="Coupon"



  constructor(private dialogService2: NbDialogService,private couponService: CouponService,private toastr: ToastrComponent) { }

  ngOnInit() {

      this.pageChangedCouponHistory(1);
  }


  OnOptionChanged(){
if(this.search_by == 0)
{
    this.ispending=0;
  this.isredeemed=0;
  this.iscancelled=0;
  this.isexpired=0;
  
this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory,0,0,0,0);

}else if(this.search_by == 1)
{
   this.ispending=0;
  this.isredeemed=1;
  this.iscancelled=0;
  this.isexpired=0;
  this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory,1,0,0,0);
}else if(this.search_by == 2){
   this.ispending=1;
  this.isredeemed=0;
  this.iscancelled=0;
  this.isexpired=0;
  this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory,0,1,0,0);
}else if(this.search_by == 3){
   this.ispending=0;
  this.isredeemed=0;
  this.iscancelled=0;
  this.isexpired=1;
   this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory,0,0,1,0);
}else if(this.search_by == 4){
   this.ispending=0;
  this.isredeemed=0;
  this.iscancelled=1;
  this.isexpired=0;
   this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory,0,0,0,1);
}
}

inSearchChange(search_text){

  if(this.count===0)
  {
    this.pageSizeHistory=1000;
         this.getCouponPurchaseHistory(1, 1000,this.isredeemed,this.ispending,this.isexpired,this.iscancelled);

  }

 if(search_text.length>0)
 {
   this.count=this.count+1

  this.purchase_list = this.purchase_list.filter((item) => {
        return (item.buyer_name.toLowerCase().includes(search_text.toLowerCase())||item.buyer_phone_no.toLowerCase().includes(search_text.toLowerCase()));
      });
 }else{
   this.pageSizeHistory=10;
   this.count=0
     this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory,this.isredeemed,this.ispending,this.isexpired,this.iscancelled);

 }
}



pageChangedCouponHistory(newPage: any){
  this.pHistory = newPage
  this.getCouponPurchaseHistory(this.pHistory, this.pageSizeHistory,this.isredeemed,this.ispending,this.isexpired,this.iscancelled);
}


getCouponPurchaseHistory(p, pageSize,redeemed,pending,expired,cancelled){
this.is_loading = true;
      this.purchase_list = [] = []
   
      this.couponService.getPurchasedDataByFilters(p, pageSize,redeemed,pending,expired,cancelled).then(
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


openHistoryviewCoupon(purchaseHistoryView: TemplateRef<any>,item){

  if(item.is_item==0)
  {
this.purchaseCouponWording="Coupon"
  }else{
this.purchaseCouponWording="Item"
  }

  this.purchaseobject=item;
  this.dialogService2.open(purchaseHistoryView,{closeOnBackdropClick:false ,hasScroll :true})
}

}
