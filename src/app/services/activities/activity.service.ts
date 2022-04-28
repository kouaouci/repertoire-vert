import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Activity } from 'src/app/shared/activity.model';
import { ActivityType } from 'src/app/shared/ActivityType.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  // API URL
  API_URL = environment.url + 'api/';

  // Global variables
  private STEPS_PER_KM = 1390;
  private CALORIES_PER_STEP = 0.04;

  // User activities
  activities: Activity[] = [];
  activitiesWeek: Activity[] = [];
  activitiesMonth: Activity[] = [];
  activitiesYear: Activity[] = [];
  activitiesUpdated = new Subject<Activity[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  initializeActivities() {

    // Initialize user activities
    this.activities = [];
    this.activitiesWeek = [];
    this.activitiesMonth = [];
    this.activitiesYear = [];

    // Get authenticated user
    let user = this.authService.getAuthenticatedUser()

    this.http.get<{ code: number, message: string, activities: Activity[] }>
      (this.API_URL + 'users/' + user.id + '/activities').subscribe(
        response => {
          if (response.code === 200) {
            // Update user activities
            this.activities = response.activities;
            // Filter activities by week, month and year
            this.filterActivities();
            // Notify subscribers
            this.activitiesUpdated.next([...this.activities]);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getCurrentActivity(): Activity {
    let index = this.activities.findIndex( a => {
      return a.status === 'Current';
    });

    if (index !== -1) {
      return this.activities[index];
    } else {
      return null;
    }
  }

  addActivity(activity: Activity): Promise<Activity> {
    return new Promise((resolve, reject) => {

      this.http.post<{ code: number, message: string, activity: Activity }>
        (this.API_URL + 'activities', activity).subscribe(
          response => {
            if (response.code === 201) {
              // Add new activity to activities list
              this.activities.unshift(response.activity);

              // Update all activity lists
              this.filterActivities();

              // Notify subscribers of new updated activities list
              this.activitiesUpdated.next([...this.activities]);

              // Return newly created activity
              resolve(response.activity);
            } else {
              reject();
              this.alertService.presentAlert("error", "errorOccurred");
            }
          },
          error => {
            reject();
            console.log(error);
            this.alertService.presentAlert("error", "errorOccurred");
          }
        );
    });
  }

  deleteActivity(activityId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete<{ code: number, message: string }>
        (this.API_URL + 'activities/' + activityId).subscribe(
          response => {
            if (response.code === 200) {

              // Remove activity from activities
              let index = this.activities.findIndex( a => {
                return a.id === activityId;
              });
              this.activities.splice(index, 1);

              // Update all activity lists
              this.filterActivities();

              // Notify subscribers of new updated activities list
              this.activitiesUpdated.next([...this.activities]);

              resolve(true);
            } else {
              reject();
              this.alertService.presentAlert("error", "errorOccurred");
            }
          },
          error => {
            console.log(error);
            reject();
            this.alertService.presentAlert("error", "errorOccurred");
          });
    });
  }

  updateActivity(activity: Activity): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.put<{ code: number, message: string }>
        (this.API_URL + 'activities/' + activity.id, activity).subscribe(
          response => {
            if (response.code === 200) {

              // Update activity in activities
              activity.status = 'Done';
              let index = this.activities.findIndex( a => {
                return a.id === activity.id;
              });
              this.activities[index] = activity;

              // Update all activity lists
              this.filterActivities();

              // Notify subscribers of new updated activities list
              this.activitiesUpdated.next([...this.activities]);

              resolve(true);
            } else {
              reject();
              this.alertService.presentAlert("error", "errorOccurred");
            }
          },
          error => {
            reject();
            console.log(error);
            this.alertService.presentAlert("error", "errorOccurred");
          }
        )
    });
  }

  getActivities(): Activity[] {
    // Return activities of current user
    return [...this.activities];
  }

  getActivitiesWeek(): Activity[] {
    // Return week activities of current user
    return [...this.activitiesWeek];
  }

  getActivitiesMonth(): Activity[] {
    // Return month activities of current user
    return [...this.activitiesMonth];
  }

  getActivitiesYear(): Activity[] {
    // Return year activities of current user
    return [...this.activitiesYear];
  }


  getActivity(id: number): Activity {

    let index = this.activities.findIndex( a => {
      return a.id === id;
    })

    // Return activity with id
    return this.activities[index];
  }


  getActivitiesUpdateListener() {
    // Return observable for components interested in cart changes
    return this.activitiesUpdated.asObservable();
  }

  getStepsPerKm(): number {
    return this.STEPS_PER_KM;
  }

  getCaloriesPerStep(): number {
    return this.CALORIES_PER_STEP;
  }

  filterActivities() {

    // Initialize activities per week / month / year
    this.activitiesWeek = [];
    this.activitiesMonth = [];
    this.activitiesYear = [];

    this.activities.forEach(a => {     

      // Create date from ISO String
      let activityDate = this.parseISOString(a.createdAt)      
      
      // Add activities of this week
      if (activityDate.getTime() >= this.getMonday().getTime()) {
        this.activitiesWeek.push(a);
      }

      // Get current month and year
      let today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      let year = today.getFullYear();
      let month = today.getMonth();

      // Add activities of this month
      if (activityDate.getMonth() === month && activityDate.getFullYear() === year) {
        this.activitiesMonth.push(a);
      }

      // Add activities of this year
      if (activityDate.getFullYear() === year) {
        this.activitiesYear.push(a);
      }
    });
  }

  getMonday() {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    let day = today.getDay(),
        diff = today.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(today.setDate(diff));
  }

  getDateLastWeek(): Date {
    let today = new Date();
    let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek;
  }

  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
}
