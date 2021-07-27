import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
// import { ShedulComponent} from './push-payment/shedul/shedul.component';
// import { CategoryComponent} from './digital-user/category/category.component';
// import { CustomerFeedbackComponent} from './customer-feedback/customer-feedback.component'
// import { FeedbackComponent} from './feedback/feedback.component'
// import { ViewItemComponent} from './digital-user/view-item/view-item.component'
import { AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component'
// import { DigitalUserDashboardComponent } from './digital-user-dashboard/digital-user-dashboard.component'
// import { CollectionTypeComponent } from './push-payment/realtime-push-payment/collection-type/collection-type.component'
// import { CollectionsComponent } from './push-payment/realtime-push-payment/collections/collections.component'
// import { UserDetailsRealtimeComponent } from './push-payment/realtime-push-payment/user-details-realtime/user-details-realtime.component' 
// import { RealtimePushPaymentHistoryComponent} from './push-payment/realtime-push-payment/realtime-push-payment-history/realtime-push-payment-history.component'

// import { ServiceProviderComponent} from './service-provider/service-provider.component'
// import { RegisterDUsersComponent} from '../pages/admin-digital-user/register-d-users/register-d-users.component'
// import { ViewAdminDigitatUserComponent} from '../pages/admin-digital-user/view-admin-digitat-user/view-admin-digitat-user.component'
// import { InstitutePaymentComponent} from '../pages/institute-payment/institute-payment.component'
import { MerchantProfileComponent} from '../pages/merchant-profile/merchant-profile.component'
// import { AnswerComponent} from '../pages/custom-transaction/answer/answer.component'
// import { QuestionComponent} from '../pages/custom-transaction/question/question.component'
// import { ChatNewComponent} from '../pages/chat-new/chat-new.component'
// import { VoucherComponent} from '../pages/voucher/voucher.component'
// import { CouponComponent} from '../pages/coupon/coupon.component'
import { PaymentGatewayComponent} from '../pages/gateway-transaction/payment-gateway/payment-gateway.component'
import {CustomTransactionHistoryComponent} from '../pages/custom-transaction-history/custom-transaction-history.component'
import { RegisterIpgUserComponent} from '../pages/gateway-transaction/payment-gateway/register-ipg-user/register-ipg-user.component'
import { AppReqestComponent } from '../pages/admin-paymentgateway/app-reqest/app-reqest.component'
import { AppRequestApproveComponent} from '../pages/admin-paymentgateway/app-request-approve/app-request-approve.component'
// import { DUserProfileComponent} from '../pages/d-user-profile/d-user-profile.component'
import { BusinessSubtypeComponent} from '../pages/business-subtype/business-subtype.component'
import { CouponHistoryComponent} from '../pages/admin-transaction-history/coupon-history/coupon-history.component'
import {PackageComponent} from '../pages/admin-packages/package/package.component'//need
import {PackageItemComponent} from '../pages/admin-packages/package-item/package-item.component'
// import { CouponTransactionComponent} from '../pages/coupon-transaction/coupon-transaction.component'  
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { TransactionHistoryComponent} from '../pages/admin-transaction-history/transaction-history/transaction-history.component'
import {AccessGuard} from '../@core/guards/assess.guard'

import {SubmitDocumentComponent} from '../pages/submit-document/submit-document.component'
import {DocumentProcessingComponent} from '../pages/document-processing/document-processing.component'
import { from } from 'rxjs';
import { SettingsModule } from './settings/settings.module';

import { QrGenerateComponent } from './qr-generate/qr-generate.component'
import { AdminAppsComponent } from './admin-applications/admin-apps/admin-apps.component'
import { ViewAppsComponent } from './admin-applications/view-apps/view-apps.component'
import {ActiveMerchantComponent} from '../pages/merchant/active-merchant/active-merchant.component'
import {PendingMerchantsComponent} from '../pages/merchant/pending-merchants/pending-merchants.component'
import {ViewPendingMerchantComponent} from '../pages/merchant/view-pending-merchant/view-pending-merchant.component'
import {SubscriptionReviewComponent} from '../pages/subscription-review/subscription-review.component'


import { PaymentLinkComponent } from './payment-link/payment-link.component';
import { IpgReportComponent } from './reports/ipg-report/ipg-report.component';//need

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
      canActivate: [AccessGuard],
      data: {type: ['m']}
    },
    {
      path: 'admin-dashboard',
      component: AdminDashboardComponent,
      canActivate: [AccessGuard],
      data: {type: ['a']}
    },
    // {
    //   path: 'digital-user-dashboard',
    //   component: DigitalUserDashboardComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: ['d']}
    // },
    // {
    //   path: 'qr-transaction-history',
    //   loadChildren: () => import('./qr-transaction-history/qr-transaction-history.module')
    //     .then(m => m.QrTransactionHistoryModule),
    //   canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module')
      .then(m => m.SettingsModule),
      data: {type: ['a']}
    },
    {
      path: 'ipg-developer',
      loadChildren: () => import('./ipg-developer/ipg-developer.module')
      .then(m => m.IpgDeveloperModule),
      data: {type: ['a']}
    },
    {
      path: 'payment-link',
      component: PaymentLinkComponent,
      data: {type: ['m']}
    },
    {
      path:'ipg-report',
      component: IpgReportComponent,//need
      data: {type: ['a']}
    },
    // {
    //   path: 'sales-manager',
    //   loadChildren: () => import('./sales-manager/sales-manager.module')
    //     .then(m => m.salesManagerModule),
    //     canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    {
      path: 'merchant',
      loadChildren: () => import('./register/register.module')
        .then(m => m.RegisterModule),
        canActivate: [AccessGuard],
      data: {type: ['a']}
    },
    {
      path: 'subtype/:id',
      component: BusinessSubtypeComponent,
      data: {
        title: 'business-subtype'
        
      },
    },
    // {
    //   path: 'service-provider',
    //   component: ServiceProviderComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: ['a']}
    // },
    // {
    //   path: 'qr-generate',
    //   loadChildren: () => import('./qr-generate/qr-generate.module')
    //     .then(m => m.qrgenerateModule),
    //     canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
      {
      path: 'qr-generate',
      component: QrGenerateComponent,
      canActivate: [AccessGuard],
      data: {type: ['m']}
    },
    // {
    //   path: 'collection-type',
    //   component: CollectionTypeComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    {
      path: 'subscription-review',
      component: SubscriptionReviewComponent,
      canActivate: [AccessGuard],
      data: {type: ['m']}
    },
    // {
    //   path: 'collection/:id',
    //   component: CollectionsComponent,
    //   data: {
    //     title: 'collections'
        
    //   },
    // },
    // {
    //   path: 'user-details-realtime',
    //   component: UserDetailsRealtimeComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    // {
    //   path: 'history-realtime-push-payment',
    //   component: RealtimePushPaymentHistoryComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    // {
    //   path: 'shedul-pushPayment',
    //   component: ShedulComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    // {
    //   path: 'admin-users',
    //   loadChildren: () => import('./admin-users/admin-users.module')
    //     .then(m => m.adminUsersModule),
    //     canActivate: [AccessGuard],
    //   data: {type: [ 'a']}
    // }, 
   
    //cheque
    // {
    //   path: 'receive-cheque',
    //   loadChildren: () => import('./receive-cheque/receive-cheque.module')
    //     .then(m => m.receiveChequeModule),
    //     canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    // {
    //   path: 'issue-cheque',
    //   loadChildren: () => import('./issue-cheque/issue-cheque.module')
    //     .then(m => m.issueChequeModule),
    //     canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    // {
    //   path: 'cheque-book',
    //   loadChildren: () => import('./cheque-book/cheque-book.module')
    //     .then(m => m.chequeBookModule),
    //     canActivate: [AccessGuard],
    //   data: {type: ['m']}



      
    // },
    // {
    //   path: 'return-cheque',
    //   loadChildren: () => import('./return-cheque/return_cheque.module')
    //     .then(m => m.returnChequeModule),
    //     canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    // {
    //   path: 'transaction-summary',
    //   loadChildren: () => import('./summarya-all-transaction/summary-all-transaction.module')
    //     .then(m => m.transactionAllSummaryModule),
    //     canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    // //qr transaction summary
    // {
    //   path: 'qr-transaction-summary',
    //   loadChildren: () => import('../pages/transaction-summary/summary.module')
    //     .then(m => m.summaryTransactionHistoryModule),
    //     canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    // {
    //   path: 'category',
    //   component: CategoryComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: [ 'd']}
    // },
    // {
    //   path: 'View-item/:id',
    //   component: ViewItemComponent,
    //   data: {
    //     title: 'View Item Details'
        
    //   },
    // },
    // {
    //   path: 'customer-feedback',
    //   component: CustomerFeedbackComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: [ 'd']}
    // },
    // {
    //   path: 'digital-user-profile',
    //   component: DUserProfileComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: [ 'd']}
    // },
    // {
    //   path: 'feedback',
    //   component: FeedbackComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: ['a']}
    // },
    // {
    //   path: 'digital-user',
    //   component: RegisterDUsersComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: [ 'a']}
    // },
    // {
    //   path: 'view-digital-user/:id',
    //   component: ViewAdminDigitatUserComponent,
    //   data: {
    //     title: 'View Digital User'
        
    //   },
    // },
    // institute payment
    // {
    //   path: 'institute-payment',
    //   component: InstitutePaymentComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: [ 'm']}
    // },
    //merchant profile
    {
      path: 'merchant-profile-details',
      component: MerchantProfileComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'm']}
    },



    //  new file start
    {
      path: 'submit-document',
      component: SubmitDocumentComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'm']}
    },
    {
      path: 'document-processing',
      component: DocumentProcessingComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'm']}
    },

     //admin-merchant
     {
      path: 'active-merchant',
      component: ActiveMerchantComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'a']}
    },
    {
      path: 'pending-merchant',
      component: PendingMerchantsComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'a']}
    },
    {
      path: 'view-pending-merchant/:id',
      component: ViewPendingMerchantComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'a']}
    },


    //  new file end












    // custom transaction
    // {
    //   path: 'question',
    //   component: QuestionComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: ['m']}
    // },
    // {
    //   path: 'answer/:id',
    //   component: AnswerComponent,
    //   data: {
    //     title: 'answers'
        
    //   },
    // },
     // custom transaction history
     {
      path: 'custom-transaction-history',
      component: CustomTransactionHistoryComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'm']}
    },

    
    // chat-new
    // {
    //   path: 'chat-new',
    //   component: ChatNewComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: [ 'm']}
    // },
    // merchant

    {
      path: 'payment-gateway',
      component: PaymentGatewayComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'm']}
    },
    {
      path: 'ipg-user/:1',
      component: RegisterIpgUserComponent,
      data: {
        title: 'View Ipg User'
        
      },
    },
    // admin
    {
      path: 'app-reqest',
      component: AppReqestComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'a']}
    },
    {
      path: 'app-request-approved/:1',
      component: AppRequestApproveComponent,
      data: {
        title: 'Approve'
        
      },
    },
      // Voucher
    // {
    //   path: 'voucher',
    //   component: VoucherComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: [ 'm']}
    // },
    //      // Coupon
    // {
    //   path: 'coupon',
    //   component: CouponComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: [ 'm']}
    // },
    // coupon history(admin)
    {
      path: 'transaction-history-coupon',
      component: CouponHistoryComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'a']}
    },
    // {
    //   path: 'coupon-transaction',
    //   component: CouponTransactionComponent,
    //   canActivate: [AccessGuard],
    //   data: {type: [ 'm']}
    // },
       {
      path: 'package',
       children: [
            { path: 'data',
                component: PackageComponent,//need
                canActivate: [AccessGuard],
                data: {type: ['a']
              }
             },
            { path: 'budget', 
             component: PackageComponent,//need
             canActivate: [AccessGuard],
              data: {
                type: ['a']
              }
             },
        ],
    
    },

         {
      path: 'package',
       children: [
            { path: 'item',   component: PackageItemComponent,//need
      canActivate: [AccessGuard],
      data: {
        type: ['a']
      }
             },
            { path: 'assign',  component: PackageItemComponent,//need
      canActivate: [AccessGuard],
      data: {
        type: ['a']
      }
             },
        ],
    
    },



    {
      path: 'admin-apps',
      component: AdminAppsComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'a']}
    },

       {
      path: 'view-app/:id',
      component: ViewAppsComponent,
      data: {
        title: 'view-app'
        
      },
    },



     {
      path: 'transaction',
      redirectTo: 'dashboard',
      canActivate: [AccessGuard],
      data: {type: ['m']}
      
    },

    {
      path: 'transaction-history',
      component: TransactionHistoryComponent,
      canActivate: [AccessGuard],
      data: {type: [ 'm']}
    },

    {
      path: '',
      redirectTo: 'admin-dashboard',
      canActivate: [AccessGuard],
      data: {
        type: ['a']
      }
    },
    {
      path: '',
      redirectTo: 'digital-user-dashboard',
      canActivate: [AccessGuard],
      data: {type: ['d']}
    },
   

    

    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
