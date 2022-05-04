import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityType } from 'src/app/shared/ActivityType.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService {

  API_URL = environment.url + 'api/';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getActivityTypes(): Promise<ActivityType[]> {
    return new Promise((resolve, reject) => {

      this.http.get<{code: number, message: string, activityTypes: ActivityType[]}>
      (this.API_URL + 'activityTypes').subscribe(
        response => {
          if (response.code === 200) {
            resolve(response.activityTypes);
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
}
