import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ActivityService } from 'src/app/services/activities/activity.service';
import { Activity } from 'src/app/shared/activity.model';

@Component({
  selector: 'app-user-activities',
  templateUrl: './user-activities.page.html',
  styleUrls: ['./user-activities.page.scss'],
})
export class UserActivitiesPage implements OnInit {

  @ViewChild("slides", { static: false }) slider: IonSlides;

  // Segments
  segment = 0;

  // Activity subscription
  activitySub: Subscription;

  // Activity lists
  @Input() activities: Activity[];
  @Input() activitiesMonth: Activity[];
  @Input() activitiesWeek: Activity[];

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
  }

  deleteActivity(id: number) {
    // Find index of activity in list "all activities"
    let indexAll = this.activities.findIndex(a => {
      return a.id === id;
    });

    // Find index of activity in list "Month activities"
    let indexMonth = this.activities.findIndex(a => {
      return a.id === id;
    });

    // Find index of activity in list "Week activities"
    let indexWeek = this.activities.findIndex(a => {
      return a.id === id;
    });

    // If found, remove activity from DB and all lists
    if (indexAll !== -1 && indexMonth !== -1 && indexWeek !== -1) {
      this.activityService.deleteActivity(id).then( result => {
        /*if (result) {
          this.activities.splice(indexAll, 1);
          this.activitiesMonth.splice(indexMonth, 1);
          this.activitiesWeek.splice(indexWeek, 1);
        }*/
      })
    }
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
}
