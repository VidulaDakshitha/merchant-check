import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-no-column-layout',
  styleUrls: ['./no-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-column>
        <ng-content></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NoColumnLayoutComponent implements OnInit {
  ngOnInit() {

  }

  constructor() {

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
