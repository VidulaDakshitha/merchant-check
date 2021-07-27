import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { CommonService } from './common.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public common: CommonService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (request.url.includes('user/merchant_login/')) {
      return next.handle(request);
    }

    if (request.url.includes('user/login_admin/')) {
      return next.handle(request);
    }
    if (request.url.includes('merchant/self_reg_merchant/')) {
      return next.handle(request);
    }
    if (request.url.includes('merchant/phone_number_duplicate_check/')) {
      return next.handle(request);
    }
    if (request.url.includes('merchant/email_duplicate_check/')) {
      return next.handle(request);
    }

    if (request.url.includes('token/refresh/')) {
      return next.handle(request);
    }
    if (request.url.includes('business-cat/get_category_unauthorized/')) {
      return next.handle(request);
    }
    if (request.url.includes('business-type/get_type/')) {
      return next.handle(request);
    }
    if (request.url.includes('bank/get_bank/')) {
      return next.handle(request);
    }
    if (request.url.includes('package/get_package_requested_details/?id=')) {
      return next.handle(request);
    }
    
    if (request.url.includes('user/rest_new_password/')) {
      return next.handle(request);
    }
    
    if (request.url.includes('user/reset-password-request/?phone_number=')) {
      return next.handle(request);
    }
    if (request.url.includes('r/reset-password-verify/')) {
      return next.handle(request);
    }
    if (request.url.includes('user/reset-password/')) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.common.getToken()}`
      }
    });
    return next.handle(request);
  }
}