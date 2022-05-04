import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transport } from 'src/app/shared/Transport.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  API_URL = environment.url + 'api/';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getTransports(): Promise<Transport[]> {
    return new Promise((resolve, reject) => {

      this.http.get<{code: number, message: string, transports: Transport[]}>
      (this.API_URL + 'transports').subscribe(
        response => {
          if (response.code === 200) {
            resolve(response.transports);
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
