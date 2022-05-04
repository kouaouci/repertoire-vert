import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CovInvitation } from 'src/app/shared/CovInvitation.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageInvitationService {

  REP_VERT_API = environment.url + 'api/';

  constructor(
    private http: HttpClient,
    private alertService: AlertService) { }

  
  getInvitations(covoiturageId: number): Promise<CovInvitation[]>{
    return new Promise((resolve, reject) => {
      this.http.get<{ code: number, message: string, invitations: CovInvitation[]}>
      (this.REP_VERT_API + 'covoiturages/' + covoiturageId + '/covInvitations')
      .subscribe(
        response => {
          if (response.code === 200) {
            resolve(response.invitations);
          } else {
            this.alertService.presentAlert("error", "errorOccurred");
            reject();
          }
        },
        error => {
          console.log(error);
          this.alertService.presentAlert("error", "errorOccurred");
          reject();
        }
      )
    });
  }


  addInvitation(invitation: CovInvitation): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post<{ code: number, message: string, invitationId: number }>
        (this.REP_VERT_API + 'covoiturages/' + invitation.covoiturageId + '/covInvitations', invitation)
        .subscribe(response => {
          if (response.code === 201) {
            this.alertService.presentAlert("success", "invitationSent");
            resolve(response.invitationId);
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


  deleteInvitation(covoiturageId: number, invitationId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete<{ code: number, message: string }>
        (this.REP_VERT_API + 'covoiturages/' + covoiturageId + '/covInvitations/' + invitationId)
        .subscribe(response => {
          if (response.code === 200) {
            this.alertService.presentAlert("success", "invitationCancelled");
            resolve(true);
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

}
