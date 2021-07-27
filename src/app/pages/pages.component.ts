import { Component } from '@angular/core';

import { sidemenu } from './pages-menu';
import {EncriptionService} from '../@core/services/encription.service'
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu: any
  constructor(private EncriptionService:EncriptionService) {
    // console.log(localStorage.getItem('opmt'))
    // this.asyncLocalStorage.getItem('opmt').then(res=>{
    //   console.log('kkkkkkkkkkk', res)
    //   this.menu = sidemenu(res);
    //   console.log(this.menu)
    // })

    //     this.asyncLocalStorage.getItem('opmt').then(res=>{
    //   this.menu = sidemenu(this.EncriptionService.response_decript(res));
     
    // })
    
this.menu = sidemenu(this.EncriptionService.response_decript(localStorage.getItem("opmt")));

    // return 
  }

  asyncLocalStorage = {
    setItem: function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    }
};
}
