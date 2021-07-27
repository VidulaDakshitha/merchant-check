import { Component, ViewChild } from '@angular/core';
import {ChartTotalSalesComponent} from './chart-total-sales/chart-total-sales.component'
import { DashboardService } from '../../@core/services/dashboard.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  @ViewChild('salesChart', { static: true }) salesChart: ChartTotalSalesComponent;
  alive = true
  customdata = {
    chartLabel: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    data: [
      [2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2]
    ]
  }

  constructor(private dashbordService: DashboardService) {
   // this.getTotalSales()
  }

  getTotalSales() {
    this.dashbordService.loadTotalSales(2020).pipe(takeWhile(() => this.alive)).subscribe(res=>{
      if (res && res['success']) {
        let formated_data =[]
        let data = res['data']['total_amount']
 
        for(let a=0; a < data.length; a++) {
          formated_data.push(parseInt(data[a]['sales']))
        }

        this.customdata['data'] = formated_data

      //  this.profitChartData = this.customdata

      }
    })
  }
}
