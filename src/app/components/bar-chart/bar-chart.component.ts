import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  // Filter per week, month or year
  @Input() filter: number;

  // Activity lists
  @Input() activitiesWeek: Activity[];
  @Input() activitiesMonth: Activity[];
  @Input() activitiesYear: Activity[];

  // Apexcharts
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  // Chart Data
  public _series;
  // Chart x axis
  public _xaxis;

  // Week
  week = ["L","M","M","J","V","S","D"];

  // Days in Month
  months = [];

  //Year
  year = ["Jan","Fév","Mar","Avr","Mai","Jui","Jui","Aoû","Sep","Oct","Nov","Dec"]

  // Loading
  loaded: boolean = false;

  constructor(
    private helper: HelperService
  ) {}

  ngOnInit() {
    
  }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
    //this.barChartMethod();
    this.apexChartInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._series) {
      this.updateChart();
    }
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
          position: 'top',
          markers: {
            fillColors: ['#618226', '#E2051A'],
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        yaxis: {
          title: {
            text: "CO2 en Kg"
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
            formatter: function(val) {
              return "$ " + val + " thousands";
            }
          }
        }
      };

      this._series = [
        {
          name: "CO2 dépensé",
          data: [],
        },
        {
          name: "CO2 économisé",
          data: []
        },
      ]

      this.updateChart()

      this.loaded = true;      
    }, 1000);
  }

  updateChart() {

    let categories;

    this._xaxis = {
      categories: [],
      min: 1,
      max: undefined
    }

    if (this.filter == 0) {
      categories = this.week;

      // Init c02 emission values for each day of the week
      this._series[0].data = [0,0,0,0,0,0,0];

      this.activitiesWeek.forEach(a => {

        // Get day of the activity
        let day = new Date(a.createdAt).getDay() - 1;

        // Add activity c02 to day of the activity
        this._series[0].data[day] += a.totalC02;
      });
      
    } else if (this.filter == 1) {

      // Init c02 emission values for each day of the current Month
      let days = this.helper.getDaysInMonth();
      this._series[0].data[0] = 0;

      // Set max day for x axis
      this._xaxis.max = days.length;      

      days.forEach( (d) => {
        // Set c02 to 0 for each day of the month
        this._series[0].data[d-1] = 0;
      });

      // Set x axis legend
      categories = this.months;

      this.activitiesMonth.forEach(a => {

        // Get day of the activity
        let date = new Date(a.createdAt).getDate();        

        // Add activity c02 to day of the activity
        this._series[0].data[date-1] += a.totalC02;
      });
    } else {
      categories = this.year;

      // Init c02 emission values for each month
      this._series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0];

      this.activitiesYear.forEach(a => {

        // Get month of the activity
        let month = new Date(a.createdAt).getMonth();

        // Add activity c02 to day of the activity
        this._series[0].data[month] += a.totalC02;
      });

    }

    this._xaxis.categories = categories;
  }
}
