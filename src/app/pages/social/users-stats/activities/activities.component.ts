import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Activity } from 'src/app/shared/activity.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit, OnChanges {

  @Input() activities: Activity[];

  displayedActivities: Activity[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.activities) {
      this.initActivities();
    }
  }

  initActivities() {
    // Initialize displayed activities
    this.displayedActivities = [];

    // Add 2 most recent activities of user
    this.activities.forEach(a => {
      if (this.displayedActivities.length < 2) {

        if (a.activityType.approved) {
          this.displayedActivities.push(a);
        }
      }
    })
  }
}
