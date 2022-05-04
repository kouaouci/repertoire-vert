import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subcategory } from 'src/app/shared/Subcategory.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  API_URL = environment.url + 'api/';
  IMG_URL = environment.url + '/images/Icones_Categories/';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getSubcategory(categoryId: number, subcategoryId: number)
    : Promise<{category: string, subcategory: Subcategory}> {
    return new Promise((resolve, reject) => {
      this.http.get<{code: number, message: string, category: string, subcategory: Subcategory}>
      (this.API_URL + 'categories/' + categoryId + '/subcategories/' + subcategoryId).subscribe(
        response => {
          if (response.code === 200) {
            resolve(response);
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
      );
    });
  }
}
