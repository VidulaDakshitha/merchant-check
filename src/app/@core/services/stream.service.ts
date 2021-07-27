import { Injectable } from '@angular/core';
import { StreamChat, Channel, ConnectAPIResponse } from 'stream-chat';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare interface UserInfo {
  token: string;
  apiKey: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})

export class StreamService {
  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) {}
  streamClient: StreamChat;
  currentUser: ConnectAPIResponse;

  public async initClient(user: UserInfo): Promise<Channel> {
    this.streamClient = new StreamChat(user.apiKey);
    // this.currentUser = await this.streamClient.setUser(
    //   {
    //     id: user.username,
    //     name: user.username,
    //   },
    //   user.token
    // );
    return this.streamClient.channel('messaging', 'General');
  }
  // get last chat user
  getLastChatUser(pageNumber, limit) {
    return this.commonService.getData('custom_transaction/get_last_chat/?page=' + pageNumber + '&limit=' + limit);
  }
  postInvoiceData(data){
    return this.commonService.postData('custom_transaction/acceptance_of_order/', data);
    // return this.commonService.postData('', data);
}

getUsersChat(page, limit, phone_no){
  return this.commonService.getData(`custom_transaction/get_chat_user/?page=${page}&limit=${limit}&mobile_no=${phone_no}`);
}
// get question and answers
getQuestionAnswers() {
  return this.commonService.getData('merchant/question_and_answer/');
}
postQuestionForUser(data){
  return this.commonService.postData('/custom_transaction/send_questions/', data);
}
// sender message
postSenderMessage(data){
  return this.commonService.postData('custom_transaction/sending_chat_message/', data);
  // return this.commonService.postData('', data);
}

}