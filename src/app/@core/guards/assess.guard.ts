import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import {EncriptionService} from '../services/encription.service'
@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {

    constructor(private EncriptionService:EncriptionService) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let types = route.data["type"] as Array<string>;
      let current_role = this.EncriptionService.response_decript(localStorage.getItem("opmt"))
      console.log("function is called")
      if (types.includes(current_role)){
    
          return true
      } else{
          return false
      }
  
    }
  }