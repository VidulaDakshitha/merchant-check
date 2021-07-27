import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EncriptionService } from '../services/encription.service';

import { Observable } from 'rxjs';
import 'rxjs';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class CommonService {
  // type=this.encriptionService.response_decript(localStorage.getItem("opmt"))
  token = '';
  constructor(private httpClient: HttpClient, private router: Router, private encriptionService: EncriptionService) {
    this.token = this.getToken();
    // console.log('kkkk')
  }

  postData(url, body) {
    const encripted_body = this.encriptionService.request_encript(body);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'text/plain',
    });

    return this.httpClient.post(environment.apiBaseUrl + url, encripted_body, { headers: httpHeaders, responseType: 'text'})
      .toPromise()
      .then((response: any) => {
        // console.log(this.encriptionService.response_decript(response))
        return this.encriptionService.response_decript(response);
      })
      .catch(
        (error: any) => {
           if(error.status==401)
        {
          this.logOut()
        }
          console.log('ERROR1111', error);
        });
  }



getData(url): any {
    const self = this;

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'text/plain',
    });

    return this.httpClient.get(environment.apiBaseUrl + url, { headers: httpHeaders, responseType: 'text' }).toPromise()
      .then((res: any) => {
       console.log(res);
      // console.log(this.encriptionService.response_decript(res));
       return this.encriptionService.response_decript(res);
      })
      .catch((error: any) => {
        if(error.status==401)
        {
          this.logOut()
        }
        console.log('ERROR', error);
      });
  }

  getChartData(url): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + url);
  }

  putData(url, body) {
    const encripted_body = this.encriptionService.request_encript(body);

    const headers = this.getHeaders();

    console.log(url);
    return this.httpClient.put(environment.apiBaseUrl + url, encripted_body, { headers: headers, responseType: 'text' })
      .toPromise()
      .then((response: any) => {
      return this.encriptionService.response_decript(response);
      })
      .catch(
        (error: any) => {
           if(error.status==401)
        {
          this.logOut()
        }
          console.log('ERROR', error);
        });
  }

  deleteData(url) {
    const headers = this.getHeaders();

    return this.httpClient.delete(environment.apiBaseUrl + url, { headers: headers, responseType: 'text' })
      .toPromise()
      .then((response: any) => {
         return this.encriptionService.response_decript(response);
      })
      .catch(
        (error: any) => {
           if(error.status==401)
        {
          this.logOut()
        }
          console.log('ERROR', error);
        });
  }

  deleteDataBody(url,param) {

    const headers = this.getHeaders();
    

    const encripted_body = this.encriptionService.request_encript(param);
    console.log(encripted_body);
    return this.httpClient.request('DELETE',environment.apiBaseUrl + url, {
      headers: headers,  
      body: encripted_body
    })
    
      .toPromise() 
      .then((response: any) => {
         return this.encriptionService.response_decript(response);
      })
      .catch(
        (error: any) => {
          console.log('ERROR', error);
        });

  }

  private getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'text/plain');
    headers.append('Accept', 'text/plain;');

    return headers;
  }

  postFormData(url, body) {
    console.log(body);
    const headers = this.getHeaders();
    return this.httpClient.post(environment.apiBaseUrl + url, body, { headers: headers })
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          if (error.status == 401) {

            this.refreshToken(localStorage.getItem('opm_refresh_token')).then(res => {
              try {
                localStorage.setItem('opm_token', res['access']);
                this.getData(url);
              } catch {
                this.router.navigate(['/login']);
              }

            });
          }
          else {
            return error;
          }
        });
  }


  putFormData(url, body) {
    const headers = this.getHeaders();
    return this.httpClient.put(environment.apiBaseUrl + url, body, { headers: headers })
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          if (error.status == 401) {
            this.refreshToken(localStorage.getItem('opm_refresh_token')).then(res => {
              try {
                localStorage.setItem('opm_token', res['access']);
                this.getData(url);
              } catch {
                this.router.navigate(['/login']);
              }

            });
          }
          else {
            return error;
          }
        });
  }

  unauthorizedPostData(url, body) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.httpClient.post(environment.apiBaseUrl + url, JSON.stringify(body), { headers: headers })
      .toPromise()
      .then((response: Response) => {
        console.log(response);
        // return this.encriptionService.response_decript(response)
        return response;
      })
      .catch(
        (error: Response) => {
          // error message "server went vacation"
        });
  }

  refreshToken(token) {
    const body = {
      'refresh': token,
    };

    return this.httpClient.post(environment.apiBaseUrl + 'token/refresh/', body).toPromise()
      .then(res => {
        return res;
      })
      .catch(error => {
        console.warn('session expired', error);
        this.router.navigate(['/login']);
      });
  }

  update_new_token() {
    if (!localStorage.getItem('opm_refresh_token')) {
      this.router.navigate(['/login']);
      console.log('kkk');
    }

    return this.refreshToken(localStorage.getItem('opm_refresh_token')).then(res => {
      try {
        localStorage.setItem('opm_token', res['access']);
      } catch {
        console.log('rrrr');
        this.router.navigate(['/login']);
      }
    });
  }

  getUserPayload() {
    const token = this.getToken();
    if (token && token != 'undefined') {
      // const userPayload = token
      const userPayload = atob(token.split('.')[1]);

      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('opm_token');
  }

  deleteToken() {
    localStorage.removeItem('opm_token');
  }


  // without encryption


getDataWithoutEncrypt(url): any {
    const self = this;

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'text/plain',
    });

    return this.httpClient.get(url).toPromise()
      .then((res: any) => {
       console.log(res);
      // console.log(this.encriptionService.response_decript(res));
       return res
      })
      .catch((error: any) => {
        console.log('ERROR', error);
      });
  }

  logOut() {
    if (this.encriptionService.response_decript(localStorage.getItem("opmt")) == 'a') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/login']);
    }
    this.deleteToken();
}

}
