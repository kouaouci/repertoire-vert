import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AlertController, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Activity } from 'src/app/shared/activity.model';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.page.html',
  styleUrls: ['./user-stats.page.scss'],
})
export class UserStatsPage implements OnInit, OnChanges {

  @ViewChild("slides", { static: false }) slider: IonSlides;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  segment: number = 0;

  // Touch events
  @Output() touchStartEvent = new EventEmitter<null>();
  @Output() touchEndEvent = new EventEmitter<null>();

  // User activities
  @Input() activities: Activity[];
  @Input() activitiesWeek: Activity[];
  @Input() activitiesMonth: Activity[];
  @Input() activitiesYear: Activity[];

  // User current activity
  ongoingActivity: boolean = false;

  // Total information
  steps: number = 0;
  distance: number = 0;
  calories: number = 0;

  // Statistiques bar chart
  title: string = "";
  series: any

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities) {
      this.updateValues();
    }
  }

  updateValues() {    

    if (this.segment == 0) {
      this.steps = Math.round(this.activitiesWeek.reduce((a, b) => a + b.steps, 0));
      this.calories = Math.round(this.activitiesWeek.reduce((a, b) => a + b.calories, 0));
      this.distance = this.activitiesWeek.reduce((a, b) => a + b.totalDistance, 0);
      
    } else if (this.segment == 1) {

      this.steps = Math.round(this.activitiesMonth.reduce((a, b) => a + b.steps, 0));
      this.calories = Math.round(this.activitiesMonth.reduce((a, b) => a + b.calories, 0));
      this.distance = this.activitiesMonth.reduce((a, b) => a + b.totalDistance, 0);
      
    } else {

      this.steps = Math.round(this.activitiesYear.reduce((a, b) => a + b.steps, 0));
      this.calories = Math.round(this.activitiesYear.reduce((a, b) => a + b.calories, 0));
      this.distance = this.activitiesYear.reduce((a, b) => a + b.totalDistance, 0);
      
    }
  }

  segmentChanged(event) {
    this.updateValues();
  }

  touchStart() {
    this.touchStartEvent.emit();
  }

  touchEnd() {
    this.touchEndEvent.emit();
  }
}
