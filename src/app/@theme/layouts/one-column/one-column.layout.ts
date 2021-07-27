import { Component, OnInit } from '@angular/core';
import {EncriptionService} from '../../../@core/services/encription.service'
@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header [user_data]='user_data'></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu">
        </ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnInit {
  user_data: any;
  ngOnInit() {

  }

  constructor(private EncriptionService:EncriptionService) {
    console.log( 'vvvvvvvvvvvvvvvv');
    // this.asyncLocalStorage.getItem('opm_user').then(res => {
    //   console.log(res, 'user-data-onepay');
    //   this.user_data = JSON.parse(res);
    // });
     this.user_data = this.EncriptionService.response_decript(localStorage.getItem("opm_user"))
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
    },
};
}
