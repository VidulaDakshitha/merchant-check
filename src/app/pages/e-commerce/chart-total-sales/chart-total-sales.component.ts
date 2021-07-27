import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { ProfitChart } from '../../../@core/data/profit-chart';
import { LayoutService } from '../../../@core/utils/layout.service';
import { DashboardService } from '../../../@core/services/dashboard.service';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../../../@core/data/orders-profit-chart';

@Component({
  selector: 'ngx-chart-total-sales',
  templateUrl: './chart-total-sales.component.html',
  styleUrls: ['./chart-total-sales.component.scss']
})
export class ChartTotalSalesComponent implements OnInit {
  @Input() 
  profitChartData: ProfitChart;

  qr_data = []
  today_cheque_amount = []
  yesterday_total= []

  userMessage

  ngOnInit() {
  
    this.getLastQrSale()
    this. getYesterdaySale()
    this. getTodayCqAmount()
  }

  

  private alive = true;

  echartsIntance: any;
  options: any = {};

  constructor(private theme: NbThemeService,
    private layoutService: LayoutService, private dashboardService: DashboardService, private ordersProfitChartService: OrdersProfitChartData) {
    this.layoutService.onChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngOnChanges(): void {
    if (this.echartsIntance) {
      this.updateProfitChartOptions(this.profitChartData);
    }
  }

  ngAfterViewInit() {
    this.getTotalSales()
  }

  setOptions(eTheme) {
    this.options = {
      backgroundColor: eTheme.bg,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.profitChartData.chartLabel,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
            },
          },
          axisLabel: {
            color: eTheme.axisTextColor,
            fontSize: eTheme.axisFontSize,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: eTheme.splitLineColor,
            },
          },
          axisLabel: {
            color: eTheme.axisTextColor,
            fontSize: eTheme.axisFontSize,
          },
        },
      ],
      series: [
        {
          name: 'Sales',
          type: 'bar',
          barWidth: '40%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: eTheme.thirdLineGradFrom,
              }, {
                offset: 1,
                color: eTheme.thirdLineGradTo,
              }]),
            },
          },
          data: this.profitChartData.data[0],
        },
      ],
    };
  }

  updateProfitChartOptions(profitChartData: ProfitChart) {
    const options = this.options;
    const series = this.getNewSeries(options.series, profitChartData.data);

    this.echartsIntance.setOption({
      series: series,
      xAxis: {
        data: this.profitChartData.chartLabel,
      },
    });
  }

  getNewSeries(series, data: number[][]) {
    return series.map((line, index) => {
      return {
        ...line,
        data: data[index],
      };
    });
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      // Fix recalculation chart size
      // TODO: investigate more deeply
      setTimeout(() => {
        this.echartsIntance.resize();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getTotalSales() {
    this.dashboardService.loadTotalSales(2020).pipe(takeWhile(() => this.alive)).subscribe(res=>{
      if (res && res['success']) {
        let formated_data =[]
        let data = res['data']['total_amount']
 
        for(let a=0; a < data.length; a++) {
          formated_data.push(parseInt(data[a]['sales']))
        }

        let customdata = {
          chartLabel: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          data: [formated_data]
        }
        console.log(customdata)

        this.profitChartData = customdata
        this.theme.getJsTheme()
        .pipe(takeWhile(() => this.alive))
        .subscribe(config => {
          const eTheme: any = config.variables.profit;
    
          this.setOptions(eTheme);
        });
      }
    })
  }


  getProfitChartData(period: string) {
    this.ordersProfitChartService.getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(profitChartData => {
        console.log(profitChartData)
        this.profitChartData = profitChartData;
      });
  }
  //get summary
      // last qr transaction
  getLastQrSale() {
    this.dashboardService.lastQrSale().then(res=>{
      if (res['success']) {
        console.log('admindfsdf', res['data'])
        this.qr_data = res['data']
      }
      else {
        this.userMessage = res['description']
      }
    })
  }
  // yesterday total sale
  getYesterdaySale() {
    this.dashboardService.yesterdaySale().then(res=>{
      if (res['success']) {
        console.log('yesterday total', res['data'])
        this.yesterday_total = res['data']
      }
      else {
        this.userMessage = res['description']
      }
    })
  }

  // today mature cheque amount
  getTodayCqAmount() {
    this.dashboardService.todayMatureCqAmount().then(res=>{
      if (res['success']) {
        this.today_cheque_amount = res['data']
        console.log('testt meee',this.today_cheque_amount)
      }
      else {
        this.userMessage = res['description']
      }
    })
  }

}
