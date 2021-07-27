import { Injectable } from '@angular/core';
import { CommonService} from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DigitalMenuService {

  constructor(private http: HttpClient,
    private commonService: CommonService) { }
//category
    getDigitalCategory() {
        return this.commonService.getData('digital_user/category/');
    }
    postDigitalAddCategory(data){
      return this.commonService.postData('digital_user/category/', data);
  }
    updateDigitalCategory(data){
      return this.commonService.putData('digital_user/category/',data);
      // return this.commonService.putData('',data);
  }
  deleteCategory(category_id){
    return this.commonService.deleteData('digital_user/category/?id=' + category_id );
}
deleteCategoryImage(id){
  return this.commonService.deleteData('digital_user/categoryimagedelete/?id=' + id );
}

//item
getItem(pageNumber, limit, id){
  return this.commonService.getData('digital_user/item/?page=' + pageNumber +'&limit=' + limit + '&id=' + id);
}
// getItem(pageNumber, limit,id){
//   return this.commonService.getData('digital_user/item/?page=' + pageNumber +'&limit=' + limit, + '&id=' + id);
// }
postItem(data){
return this.commonService.postData('digital_user/item/', data);
}
updateItem(data){
return this.commonService.putData('digital_user/item/',data);
}
deleteItem(item_id){
return this.commonService.deleteData('digital_user/item/?id=' + item_id );
}
//user feedback
getCustomerFeedback(pageNumber, limit){
  return this.commonService.getData('digital_user/getdigitaluserfeedback/?page=' + pageNumber +'&limit=' + limit);
}
//feedback
getFeedback(){
  return this.commonService.getData('digital_user/feedback/');
}
postFeedback(data){
return this.commonService.postData('digital_user/feedback/', data);
}
updateFeeedback(data){
return this.commonService.putData('digital_user/feedback/',data);
}
deleteFeedback(id){
return this.commonService.deleteData('digital_user/feedback/?id=' + id );
}
// reply
postReplyFeedback(data){
  return this.commonService.postData('digital_user/replyemail/', data);
  }
  // user profile
  getDigitalUserProfileDetails(){
    return this.commonService.getData('digital_user/pro_get_digital_user/');
  }
}
