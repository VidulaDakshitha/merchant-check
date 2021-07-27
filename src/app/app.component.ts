/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CommonService } from './@core/services/common.service'
import { WebSocketService } from './@core/services/sockets.service'
import { environment} from '../environments/environment'
import {  PushPaymentService} from './@core/services/push-payment.service'
import {  UserService } from './@core/services/user.service'
import { TransactionHistoryService} from './@core/services/transaction-history.service'
import { StreamService} from './@core/services/stream.service'
import {EncriptionService} from './@core/services/encription.service'

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('dialogTimeOut', { static: false }) modelDialog
  @ViewChild('dialogTimeOut2', { static: false }) modelDialog2
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'socketio-angular';
  timeout_model: any
  timeout_model2: any
  Subject: any
  messageFromServer: string;
  public modalFireCondition = true;
  public modalFireConditionfalse = false;
  socket_path = environment.socket_url;
  p:any
  pageSize:any
  payment_status:boolean
  socket_massage
  message_type
  socket_user_phone_number
  socket_user_email
  socket_user_name

  constructor(private analytics: AnalyticsService, private seoService: SeoService,
    private idle: Idle, private keepalive: Keepalive, private router: Router, private dialogService: NbDialogService,
    private commonService: CommonService, private webSocketService: WebSocketService,private pushPaymentService: PushPaymentService, private userService: UserService,
    private transactionHistoryService:TransactionHistoryService,private streamService:StreamService, private EncriptionService:EncriptionService) {

    // idle.setIdle(120);
    // idle.setTimeout(120);
    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => {
    //   this.idleState = 'No longer idle.'
    //   console.log(this.idleState);
    //   this.reset();
    // });
    // idle.onTimeout.subscribe(() => {
    //   this.idleState = 'Timed out!';
    //   this.timedOut = true;
    //   console.log(this.idleState);
     
    //   if (localStorage.getItem('opmt') == 'a') {
    //     this.router.navigate(['/admin']);
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    //   this.commonService.deleteToken();
    // });
    // idle.onIdleStart.subscribe(() => {
    //   this.idleState = 'You\'ve gone idle!'
    //   console.log(this.idleState);
    //   this.timeout_model = this.dialogService.open(this.modelDialog, { closeOnBackdropClick: false });
    // });
    // idle.onTimeoutWarning.subscribe((countdown) => {
    //   this.idleState = 'You will time out in ' + countdown + ' seconds!'
    //   console.log(this.idleState);
    // });


    // keepalive.interval(120);

    // keepalive.onPing.subscribe(() => this.lastPing = new Date());

    // this.reset();

    // let user = JSON.parse(localStorage.getItem('opm_user'))

    // if (user) {
    //   this.connect_socket(user['user_id'])
    // }
    

  }
// web socket
  connect_socket(user_id) {
    this.webSocketService.createObservableSocket(`${this.socket_path}${user_id}/`)
    .subscribe(
      data => {

        let value = JSON.stringify(data)
        var myJson = eval(value);
        data = JSON.parse(myJson)
        console.log(data ,'testsockets')

        if (data["message_type"] == "push_payment") {
          this.message_type = data['message_type'] == 'push_payment' ? 'Push Payment':''
          this.payment_status = data['body']['transaction_status'] == true ? true : false
          this.socket_massage = data['body']['status_message']
          this.socket_user_phone_number = data['body']['customer_phone_no']
          this.socket_user_email = data['body']['customer_email']
          this.socket_user_name = data['body']['customer_name']
         
          this.timeout_model2 = this.dialogService.open(this.modelDialog2,{ closeOnBackdropClick: false });
          this.pushPaymentService.getPaymentHistory(this.p, this.pageSize) 

        } else if (data["message_type"] == "institute_payment") {
          this.message_type = data['message_type'] == 'institute_payment' ? 'Institute Payment':''
          this.payment_status = data['body']['transaction_status'] == true ? true : false
          this.socket_massage = data['body']['transaction_description']
          this.socket_user_phone_number = data['body']['customer_phone_no']
          this.socket_user_email = data['body']['customer_email']
          this.socket_user_name = data['body']['customer_name']

          this.timeout_model2 = this.dialogService.open(this.modelDialog2,{ closeOnBackdropClick: false });
          this.transactionHistoryService.getInstitutePaymentHistory(this.p, this.pageSize) 
        }
        else if (data["message_type"] == "qr_transaction") {
          this.message_type = data['message_type'] == 'qr_transaction' ? 'QR Transaction':''
          this.payment_status = data['body']['transaction_status'] == true ? true : false
          this.socket_massage = data['body']['transaction_description']
          this.socket_user_phone_number = data['body']['customer_phone_no']
          this.socket_user_email = data['body']['customer_email']
          this.socket_user_name = data['body']['customer_name']
          this.transactionHistoryService.getTransactionHistory(this.p, this.pageSize) 
          this.transactionHistoryService.getTransactionHistoryOnepay(this.p, this.pageSize)
        }
        else if (data["message_type"] == "chat") {
          this.message_type = data['message_type'] == 'chat' ? 'Chat':''
          this.socket_massage = data['body']['content']
          this.socket_user_phone_number = data['body']['sender_phone_no']
          this.socket_user_name = data['body']['sender_name']
        }
        else if (data["message_type"] == "Prescription Transaction") {
          this.message_type = data['message_type'] == 'Prescription Transaction' ? 'Prescription Transaction':''
          this.payment_status = data['body']['transaction_status'] == true ? true : false
          this.socket_massage = data['body']['transaction_description']
          this.socket_massage = data['body']['status_message']
          this.socket_user_phone_number = data['body']['customer_phone_no']
          this.socket_user_email = data['body']['customer_email']
          this.socket_user_name = data['body']['customer_name']
         
          this.timeout_model2 = this.dialogService.open(this.modelDialog2,{ closeOnBackdropClick: false });
          // this.streamService.getDataLastChatUsers() 

        }

      },
      err => console.log(err),
      () => console.log('The observable stream is complete')
    );
  }
  pop_up_close(){
    this.timeout_model2.close()
    
  }



  sendMessageToServer() {
    console.log("Sending message to WebSocket server");

    this.webSocketService.sendMessage("Hello from client");
  }


  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    let self = this
    this.userService.getLoggedInStatus.subscribe(user_id => {
      console.log('ddddd', user_id)
      self.connect_socket(user_id)
    });

    
  }
  stay() {
    this.commonService.update_new_token().then(res => {
      this.timeout_model.close()
    })
  }
  logOut() {
    if (this.EncriptionService.response_decript(localStorage.getItem("opmt")) == 'a') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/login']);
    }
    this.commonService.deleteToken();
  }

  onStorageChange(ev:KeyboardEvent) {
    // do something meaningful with it
    console.log(`Localstorage change/updated!`);
  }
  /////////////////////////////////////////////////////socket



}
