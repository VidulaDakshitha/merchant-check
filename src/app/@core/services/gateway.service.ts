import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class GatewayService {
   constructor(private commonService: CommonService) { }

    get_developer_data(){
        return this.commonService.getData('ipg/ipg/developer/');
    }

    update_developer_data(data){
        return this.commonService.putData('ipg/ipg/developer/', data);
    }

    getIpgProviders(){
        return this.commonService.getData('ipg/ipg/app-providers/');
    }

    addApp(data){
        return this.commonService.postData('ipg/ipg/app/', data);
    }

    updateApp(data){
        return this.commonService.putData('ipg/ipg/app/', data);
    }

    getApps(){
        return this.commonService.getData('ipg/ipg/app/');
    }

    getAppsById(id){
        return this.commonService.getData('ipg/ipg/app/?app_id=' + id);
    }

    refreshToken(req){
        return this.commonService.putData('ipg/ipg/app-token-modification/', req);
    }



    createPaymentLink(req){
        return this.commonService.postData('ipg/payment-link/', req);
    }

    getPaymantLinks(params){
        return this.commonService.getData('ipg/payment-link/?' + params);
    }

    disableApp(param){
        console.log(param)
        return this.commonService.deleteDataBody('ipg/ipg/app/',param);
    }

    requestGoLive(param){
        console.log(param)
        return this.commonService.postData('ipg/ipg/app-request-to-live/',param);
    }

    requestGoUpdate(param){
        return this.commonService.postData('ipg/ipg/app-modification/',param);
    }

}