import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-travel-info',
  templateUrl: './travel-info.component.html',
  styleUrls: ['./travel-info.component.scss']
})
export class TravelInfoComponent implements OnInit {

  @Input() datetime: Date;
  @Input() places: number;

  date: any;
  time: any;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    // Get date and time
    this.date = this.datePipe.transform(this.datetime, 'dd/MM/yyyy');
    this.time = this.datePipe.transform(this.datetime, 'HH:mm');
  }

}
