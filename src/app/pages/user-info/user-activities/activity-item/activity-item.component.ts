import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { DateService } from 'src/app/services/date/date.service';
import { Activity } from 'src/app/shared/activity.model';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {

  @Output() deleteEvent = new EventEmitter<number>();

  @Input() activity: Activity;

  // Date and time
  date: any;
  time: any;

  constructor(
    private dateService: DateService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    if (this.activity) {
      this.date = this.dateService.getDate(this.activity.createdAt);
      this.time = this.dateService.getTime(this.activity.createdAt);
    }
  }

  handleDelete() {
    this.alertService.presentAlertConfirm(
      "confirmation",
      "deleteActivityConfirm",
      () => {
        this.deleteEvent.emit(this.activity.id);
      }
    );
  }
}
