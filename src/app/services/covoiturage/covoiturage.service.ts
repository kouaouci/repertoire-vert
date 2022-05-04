import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Covoiturage } from 'src/app/shared/Communauty.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageService {

  REP_VERT_API = environment.url + 'api/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService) { }


  getCovoiturages(date: string): Promise<Covoiturage[]> {

    let params  = new HttpParams().set("departuredate", date);

    return new Promise((resolve, reject) => {
      this.http.get<{code: number, message: string, content: Covoiturage[]}>
      (this.REP_VERT_API + 'covoiturages', { params: params }).subscribe(
        response => {          
          resolve(response.content);
        },
        error => {
          reject();
          console.log(error);
        }
      )
    })
  }


  getCovoiturage(id: number): Promise<Covoiturage> {
    return new Promise((resolve, reject) => {
      this.http.get<{code: number, message: string, content: Covoiturage}>
      (this.REP_VERT_API + 'covoiturages/' + id).subscribe(
        response => {
          if (response.code === 200) {
            resolve(response.content[0]);
          } else {
            reject();
          }
        },
        error => {
          reject();
          console.log(error);
        }
      )
    })
  }


  addCovoiturageOffer(covoiturage: Covoiturage): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post<{ code: number, message: string, covoiturageId: number }>
        (this.REP_VERT_API + 'covoiturages', covoiturage).subscribe(
          response => {
            if (response.code === 201) {
              resolve(response.covoiturageId);
            } else {
              reject();
            }
          },
          error => {
            console.log(error);
            reject();
          }
        )
    });
  }


  deleteCovoiturage(id: number): void {
    this.http.delete<{code: number, message: string}>
    (this.REP_VERT_API + 'covoiturages/' + id).subscribe(
      response => {
        if (response.code === 200) {
          this.router.navigate(['/tabs/covoiturage']);
        } else {
          this.alertService.presentAlert("error", "errorOccurred");
        }
      },
      error => {
        console.log(error);
        this.alertService.presentAlert("error", "errorOccurred");
      }
    )
  }


  // Functions for calculating distance between 2 points

  getDistanceFromLatLonInKm(lat1: number,lon1: number,lat2: number,lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}
