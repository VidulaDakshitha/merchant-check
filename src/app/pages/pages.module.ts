import { NgModule } from "@angular/core";
import { NbBadgeModule, NbMenuModule, NbSpinnerModule } from "@nebular/theme";
import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QRCodeModule } from "angularx-qrcode";
import { BreadcrumbModule } from "angular-crumbs";
import { NgxCurrencyModule } from "ngx-currency";
import { ClipboardModule } from "ngx-clipboard";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

import {
  NbButtonModule,
  NbInputModule,
  NbAccordionModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbRadioModule,
  NbCheckboxModule,
  NbSelectModule,
  NbDatepickerModule,
  NbCardModule,
  NbUserModule,
  NbChatModule,
  NbPopoverModule,
  NbSidebarModule,
  NbToggleModule,
  NbTooltipModule,
} from "@nebular/theme";
// import { ShedulComponent } from "./push-payment/shedul/shedul.component";
import { NgxPaginationModule } from "ngx-pagination";
// import { CategoryComponent } from "./digital-user/category/category.component";
// import { CustomerFeedbackComponent } from "./customer-feedback/customer-feedback.component";
// import { FeedbackComponent } from "./feedback/feedback.component";
// import { ViewItemComponent } from "./digital-user/view-item/view-item.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
// import { DigitalUserDashboardComponent } from "./digital-user-dashboard/digital-user-dashboard.component";
// import { CollectionComponent } from './real-time-pushpayment/collection/collection.component';
// import { CollectionTypeComponent } from "./push-payment/realtime-push-payment/collection-type/collection-type.component";
// import { UserDetailsRealtimeComponent } from "./push-payment/realtime-push-payment/user-details-realtime/user-details-realtime.component";
// import { CollectionsComponent } from "./push-payment/realtime-push-payment/collections/collections.component";
// import { RealtimePushPaymentHistoryComponent } from "./push-payment/realtime-push-payment/realtime-push-payment-history/realtime-push-payment-history.component";

// import { ServiceProviderComponent } from "./service-provider/service-provider.component";
// import { RegisterDUsersComponent } from "./admin-digital-user/register-d-users/register-d-users.component";
// import { ViewAdminDigitatUserComponent } from "./admin-digital-user/view-admin-digitat-user/view-admin-digitat-user.component";
// import { InstitutePaymentComponent } from "./institute-payment/institute-payment.component";
import { MerchantProfileComponent } from "./merchant-profile/merchant-profile.component";
// import { QuestionComponent } from "./custom-transaction/question/question.component";
// import { AnswerComponent } from "./custom-transaction/answer/answer.component";
import { AgmCoreModule } from "@agm/core";
// import { ChatNewComponent } from "./chat-new/chat-new.component";
import { ImageViewerModule } from "ng2-image-viewer";
// import { VoucherComponent } from "./voucher/voucher.component";
// import { CouponComponent } from "./coupon/coupon.component";
import { TagInputModule } from "ngx-chips";
import { PaymentGatewayComponent } from "./gateway-transaction/payment-gateway/payment-gateway.component";
import { CustomTransactionHistoryComponent } from "./custom-transaction-history/custom-transaction-history.component";
import { RegisterIpgUserComponent } from "./gateway-transaction/payment-gateway/register-ipg-user/register-ipg-user.component";
import { AppReqestComponent } from "./admin-paymentgateway/app-reqest/app-reqest.component";
import { AppRequestApproveComponent } from "./admin-paymentgateway/app-request-approve/app-request-approve.component";
// import { DUserProfileComponent } from "./d-user-profile/d-user-profile.component";
// import { AceEditorModule } from 'ng2-ace-editor';
// import { CalenderComponent } from './calender/calender.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { BusinessSubtypeComponent } from './business-subtype/business-subtype.component';
import { CouponHistoryComponent } from './admin-transaction-history/coupon-history/coupon-history.component'
import { CouponTransactionComponent } from './coupon-transaction/coupon-transaction.component';
import { IpgDeveloperComponent } from './ipg-developer/apps/ipg-developer.component';

import {PackageComponent} from './admin-packages/package/package.component'
import {PackageItemComponent} from './admin-packages/package-item/package-item.component';
import { TransactionHistoryComponent } from './admin-transaction-history/transaction-history/transaction-history.component';
import { SubmitDocumentComponent} from '../pages/submit-document/submit-document.component';
import { DocumentProcessingComponent } from './document-processing/document-processing.component'
import { PaymentLinkComponent } from './payment-link/payment-link.component'
import { QrGenerateComponent } from './qr-generate/qr-generate.component';
import { AdminAppsComponent } from './admin-applications/admin-apps/admin-apps.component';
import { ViewAppsComponent } from './admin-applications/view-apps/view-apps.component';
// import { BasicDataComponent } from './admin-applications/view-apps/basic-data/basic-data.component';
// import { NetworksComponent } from './admin-applications/view-apps/networks/networks.component';
import { ActiveMerchantComponent} from '../pages/merchant/active-merchant/active-merchant.component';
import { PendingMerchantsComponent} from '../pages/merchant/pending-merchants/pending-merchants.component';
import { ViewPendingMerchantComponent } from './merchant/view-pending-merchant/view-pending-merchant.component'
import { qrgenerateModule } from './qr-generate/qr-generate.module';
import { SubscriptionReviewComponent } from './subscription-review/subscription-review.component';


// import { ImageCropperModule } from "ngx-image-cropper";
// import { BusinessSubtypeComponent } from "./business-subtype/business-subtype.component";
// import { CouponHistoryComponent } from "./admin-transaction-history/coupon-history/coupon-history.component";
// import { CouponTransactionComponent } from "./coupon-transaction/coupon-transaction.component";
// import { IpgDeveloperComponent } from "./ipg-developer/apps/ipg-developer.component";

// import { PackageComponent } from "./admin-packages/package/package.component";
// import { PackageItemComponent } from "./admin-packages/package-item/package-item.component";
// import { TransactionHistoryComponent } from "./admin-transaction-history/transaction-history/transaction-history.component";
// import { SubmitDocumentComponent } from "../pages/submit-document/submit-document.component";
// import { DocumentProcessingComponent } from "./document-processing/document-processing.component";
// import { PaymentLinkComponent } from "./payment-link/payment-link.component";
// import { QrGenerateComponent } from "./qr-generate/qr-generate.component";
// import { AdminAppsComponent } from "./admin-applications/admin-apps/admin-apps.component";
// import { ViewAppsComponent } from "./admin-applications/view-apps/view-apps.component";
// import { ActiveMerchantComponent } from "../pages/merchant/active-merchant/active-merchant.component";
// import { PendingMerchantsComponent } from "../pages/merchant/pending-merchants/pending-merchants.component";
// import { ViewPendingMerchantComponent } from "./merchant/view-pending-merchant/view-pending-merchant.component";
// import { qrgenerateModule } from "./qr-generate/qr-generate.module";
import { IpgReportComponent } from "./reports/ipg-report/ipg-report.component";

import { SharedDirectiveModule } from "../_directives/shared_directive.module";
import { FileExportService } from "../@core/services/export_file.service";
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  imports: [
    SharedDirectiveModule,
    BreadcrumbModule,
    ClipboardModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ECommerceModule,
    MiscellaneousModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbListModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbTabsetModule,
    NbRadioModule,
    NbCheckboxModule,
    NbSelectModule,
    NbDatepickerModule,
    NbCardModule,
    QRCodeModule,
    NgxPaginationModule,
    NbUserModule,
    NgxCurrencyModule,
    NbChatModule,
    NbPopoverModule,
    ImageViewerModule,
    // AceEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
PdfViewerModule,
    qrgenerateModule,
    NbSidebarModule.forRoot(),
    NbToggleModule,
    ImageCropperModule,
    NbBadgeModule,
    NbTooltipModule,
    TagInputModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCY7NipnOpjVFeyNxuI8xW8u9-GbPbWCUE",
      libraries: ["places"],
    }),
  ],
  providers: [FileExportService],
  declarations: [
    PagesComponent,
    // ShedulComponent,
    // CategoryComponent,
    // CustomerFeedbackComponent,
    // FeedbackComponent,
    // ViewItemComponent,
    AdminDashboardComponent,
    // DigitalUserDashboardComponent,
    // CollectionComponent,
    // CollectionTypeComponent,
    // UserDetailsRealtimeComponent,
    // CollectionsComponent,
    // OpDataTableComponent,

    // RealtimePushPaymentHistoryComponent,
    // ServiceProviderComponent,
    // RegisterDUsersComponent,
    // ViewAdminDigitatUserComponent,
    // InstitutePaymentComponent,
    MerchantProfileComponent,
    // QuestionComponent,
    // AnswerComponent,
    // ChatNewComponent,
    ActiveMerchantComponent,
    PendingMerchantsComponent,
    ViewPendingMerchantComponent,

    // VoucherComponent,

    // CouponComponent,
    PackageComponent,
    PaymentGatewayComponent,
    // PaymentLinkComponent,
    CustomTransactionHistoryComponent,
    PackageItemComponent,
    RegisterIpgUserComponent,

    AppReqestComponent,

    AppRequestApproveComponent,
    // DUserProfileComponent,
    BusinessSubtypeComponent,
    CouponHistoryComponent,
    CouponTransactionComponent,

    TransactionHistoryComponent,

    SubmitDocumentComponent,

    DocumentProcessingComponent,
    AdminAppsComponent,
    ViewAppsComponent,

    // BasicDataComponent,

    // NetworksComponent,
    PaymentLinkComponent,
    SubscriptionReviewComponent,

    // PaymentLinkComponent,
    IpgReportComponent,
  ],
})
export class PagesModule {}
