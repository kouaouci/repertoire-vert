import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participation } from 'src/app/shared/participation.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageParticipationService {

  REP_VERT_API = environment.url + 'api/';

  constructor(
    private http: HttpClient,
    private alertService: AlertService) { }

  addParticipation(participation: Participation): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post<{ code: number, message: string, participationId: number }>
        (this.REP_VERT_API + 'covoiturages/' + participation.covoiturageId + '/participations', participation)
        .subscribe(response => {
          if (response.code === 201) {
            this.alertService.presentAlert("success", "reservationSent");
            resolve(response.participationId);
          } else {
            this.alertService.presentAlert("error", "errorOccurred");
            reject();
          }
        },
          error => {
            console.log(error);
            this.alertService.presentAlert("error", "errorOccurred");
            reject();
          });
    });
  }

  acceptParticipation(participationId: number, covoiturageId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.put<{code: number, message: string}>
      (this.REP_VERT_API + 'covoiturages/' + covoiturageId + '/participations/' + participationId, {})
      .subscribe(response => {
        if (response.code === 200) {
          resolve(true);
        } else {
          this.alertService.presentAlert("error", "errorOccurred");
        }
      },
      error => {
        console.log(error);
        this.alertService.presentAlert("error", "errorOccurred");
        reject();
      })
    });
  }

  deleteParticipation(participationId: number, covoiturageId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete<{code: number, message: string}>
      (this.REP_VERT_API + 'covoiturages/' + covoiturageId + '/participations/' + participationId)
      .subscribe(response => {
        if (response.code === 200) {
          resolve(true);
        } else {
          this.alertService.presentAlert("error", "errorOccurred");
          resolve(false);
        }
      },
      error => {
        console.log(error);
        this.alertService.presentAlert("error", "errorOccurred");
      })
    })
  }
}
