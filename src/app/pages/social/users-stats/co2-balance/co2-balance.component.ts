import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Activity } from 'src/app/shared/activity.model';

@Component({
  selector: 'app-co2-balance',
  templateUrl: './co2-balance.component.html',
  styleUrls: ['./co2-balance.component.scss']
})
export class Co2BalanceComponent implements OnInit {

  @Input() activities: Activity[];

  // Selected month and year
  currentMonth: number;
  currentYear: number;
  month: number = 0;
  year: number = new Date().getFullYear();

  months = [
    'january', 'february', 'march', 'april',
    'may', 'june', 'july', 'august',
    'september', 'october', 'november', 'december'
  ];

  years = [];

  // CO2 emissions per day
  emissions: number[] = [];

  constructor(
    private helper: HelperService
  ) { }

  ngOnInit() {

    this.updateDate();

    // Update bar chart
    //this.updateBarChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
        
    if (this.activities) {
      // Update bar chart info
      this.updateDate();
      this.updateBarChart();
    }
  }

  updateDate() {
    // Get today's date
    let today = new Date();

    // Get today's month and year
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();

    // Set bar month to current month
    this.month = this.currentMonth;

    // Add past 10 years as options in select
    for (let i = this.currentYear; i >= this.currentYear - 10; i--) {
      this.years.push(i);
    }
  }

  updateBarChart() {

    // Get days in month for selected month and year
    let days = this.helper.getDaysInAMonth(this.month + 1, this.year);

    // Get activities for selected month and year
    let monthActivities: Activity[] = this.getMonthActivities();

    // initialize array with co2 emissions for each day of the month
    this.emissions = [];
    for(let i = 0; i < days; i++) {
      this.emissions[i] = 0;
    }

    // Add cO2 emissions for each day of the month
    monthActivities.forEach(a => {
      let date = new Date(a.createdAt);
      this.emissions[date.getDate() - 1] += a.totalC02;
    });
  }

  getMonthActivities() {

    let monthActivities = [];

    this.activities.forEach(a => {
      
      let date = new Date(a.createdAt);

      if (date.getMonth() === this.month && date.getFullYear() === this.year) {
        monthActivities.push(a);
      }
    });

    return monthActivities;
  }

  handleMonth(event) {
    this.month = event.detail.value;
    this.updateBarChart();
  }

  handleYear(event) {
    this.year = event.detail.value
    this.updateBarChart();
  }
}
