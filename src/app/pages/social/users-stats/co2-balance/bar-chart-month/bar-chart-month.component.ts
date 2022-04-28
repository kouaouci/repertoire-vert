import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { HelperService } from 'src/app/services/helper/helper.service';
import { Activity } from 'src/app/shared/activity.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-bar-chart-month',
  templateUrl: './bar-chart-month.component.html',
  styleUrls: ['./bar-chart-month.component.scss']
})
export class BarChartMonthComponent implements OnInit, OnChanges {

  @Input() emissions: number[];
  @Input() month: number;
  @Input() year: number;

  // Apexcharts
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  nbDays: number = 0;

  loaded: boolean = false;

  // Translations
  co2inkg: string;
  co2emissions: string;
  co2saved: string;

  constructor(
    private translate: TranslateService,
    private helper: HelperService) { }

  ngOnInit() {
    this.translate.get("userStats").subscribe(res => {
      this.co2inkg = res.co2InKg;
      this.co2emissions = res.co2Emissions;
      this.co2saved = res.co2Saved;
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // Translate legend
      this.co2inkg = event.translations.userStats.co2InKg;
      this.co2emissions = event.translations.userStats.co2Emissions;
      this.co2emissions = event.translations.userStats.co2Saved;

      // Reload chart
      this.translateChart();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.nbDays = this.helper.getDaysInAMonth(this.month, this.year);
    if (this.loaded) {
      this.updateChart();
    } else {
      this.apexChartInit();
    }
  }

  ngAfterViewInit() {
    this.apexChartInit();
  }

  translateChart() {
    this.chartOptions.yaxis = {
      title: {
        text: this.co2inkg
      },
      labels: {
        "formatter": function (val) {
          return val.toFixed(0)
        }
      }
    };

    this.chartOptions.series = [
      {
        name: this.co2emissions,
        data: this.emissions
      },
      {
        name: this.co2saved,
        data: []
      }
    ]
  }

  apexChartInit() {

    setTimeout(() => {

      this.chartOptions = {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%"
          }
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: 'bottom',
          markers: {
            fillColors: ['#618226', '#E2051A'],
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        series: [
          {
            name: this.co2emissions,
            data: this.emissions
          },
          {
            name: this.co2saved,
            data: []
          }
        ],
        xaxis: {
          categories: [],
          min: 1,
          max: this.nbDays
        },
        yaxis: {
          title: {
            text: this.co2inkg
          },
          labels: {
            "formatter": function (val) {
              return val.toFixed(0)
            }
          }
        },
        fill: {
          opacity: 1,
          colors: ['#618226', '#E2051A']
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            }
          }
        }
      };

      this.loaded = true;

      this.updateChart();
    }, 1000);
  }

  updateChart() {
    // Update x axis number of days
    this.chartOptions.xaxis = {
      categories: [],
      min: 1,
      max: this.nbDays
    };

    // Update emissions for each day of month
    this.chartOptions.series = [
      {
        name: this.co2emissions,
        data: this.emissions
      },
      {
        name: this.co2saved,
        data: []
      }
    ];
  }
}
