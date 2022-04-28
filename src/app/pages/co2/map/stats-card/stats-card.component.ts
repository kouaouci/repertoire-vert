import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {

  @Input() text: string;
  @Input() icon: string;
  @Input() number: string;

  constructor() { }

  ngOnInit() {
  }

}
