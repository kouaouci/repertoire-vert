import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preference } from 'src/app/shared/Preference.model';
import { UserPreference } from 'src/app/shared/UserPreference.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  API_URL = environment.url + 'api/';
  //API_URL = "https://www.repertoirevert.org/rest";
  //API_PROXY_URL = environment.proxyUrl + 'rest'

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getPreferences(): Promise<Preference[]> {
    return new Promise((resolve, reject) => {
      this.http.get<{code: number, message: string, preferences: Preference[]}>
      (this.API_URL + 'preferences').subscribe( response => {
        if (response.code === 200) {
          // Return preferences
          resolve(response.preferences);
        }
      },
      error => {
        console.log(error);
        reject();
      });
    });
  }

  getUserPreferences(userId: number): Promise<UserPreference[]> {
    return new Promise((resolve, reject) => {
      this.http.get<{code: number, message: string, preferences: UserPreference[]}>
      (this.API_URL + 'users/' + userId + '/preferences').subscribe( response => {
        if (response.code === 200) {
          // Return user preferences
          resolve(response.preferences);
        }
      },
      error => {
        console.log(error);
        reject();
      });
    });
  }

  addUserPreference(userPreference: UserPreference): Promise<Preference> {
    return new Promise((resolve, reject) => {
      this.http.post<{code: number, message: string, preference: Preference}>
      (this.API_URL + 'users/' + userPreference.user + '/preferences', userPreference)
      .subscribe( response => {

        if (response.code === 201) {
          // Return new user preference
          resolve(response.preference);
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
    })
  }

  deleteUserPreference(preferenceId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete<{code: number, message: string}>
      (this.API_URL + 'userPreferences/' + preferenceId).subscribe( response => {
        if (response.code === 200) {
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
}
