import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Activity } from 'src/app/shared/activity.model';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.scss']
})
export class ListActivitiesComponent implements OnInit, OnChanges {

  @Output() deleteEvent = new EventEmitter<number>();

  @Input() period: string;
  @Input() activities: Activity[];

  config: any;

  constructor() {}

  ngOnInit() {

    this.config= {
      id: this.period,
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0
    };

    if (this.activities) {
      this.config.totalItems = this.activities.length;      
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities) {

      this.config= {
        id: this.period,
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: 0
      };

      this.config.totalItems = this.activities.length;
    }
  }

  deleteActivity(id: number) {

    // Notify parent
    this.deleteEvent.emit(id);
  }

  pageChanged(event) {
    this.config.currentPage = event
  }

}
