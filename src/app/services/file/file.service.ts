import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  API_URL = environment.url + 'api/'

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  uploadImage(type: string, file: File): Promise<string> {

    // Set image to be uploaded to formData
    const formData = new FormData();
    formData.append("image", file);

    return new Promise((resolve, reject) => {
      this.http.post<{code: number, message: string, image: string}>
      (this.API_URL + 'images/' + type, formData).subscribe( response => {

        if (response.code === 201) {
          resolve(response.image);
        } else {
          reject();
          this.alertService.presentAlert('error', 'errorOccurred');
        }
      },
      error => {
        console.log(error);
        this.alertService.presentAlert('error', 'errorOccurred');
        reject();
      })
    })
  }
}
