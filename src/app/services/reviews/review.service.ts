import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $ } from 'protractor';
import { Product } from 'src/app/shared/Product.model';
import { Review } from 'src/app/shared/Review.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  API_URL = environment.url + 'api/';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }


  getReviews(id: number, entity: string): Promise<{
    userReviews: Review[],
    companyReviews: Review[],
    companyId?: number
  }> {
    return new Promise((resolve, reject) => {
      this.http.get<{
        code: number,
        message: string,
        reviews: Review[],
        userReviews: Review[],
        companyReviews: Review[],
        companyId?: number
      }>
        (this.API_URL + entity + 's/' + id + '/reviews').subscribe(
          response => {
            if (response.code === 200) {
              let result = {
                userReviews: response.userReviews,
                companyReviews: response.companyReviews,
              }
              if (response.companyId) {
                let resultWithCompanyId = {
                  ...result,
                  companyId: response.companyId
                }
                resolve(resultWithCompanyId);
              }
              resolve(result);
            } else {
              this.alertService.presentAlert("error", "errorOccurred");
            }
          },
          error => {
            //Error
            console.log(error);
            reject();
            this.alertService.presentAlert("error", "errorOccurred");
          }
        )
    });
  }


  addReview(review: Review): Promise<{ reviewId: number, reviewDate: Date }> {
    return new Promise((resolve, reject) => {

      this.http.post<{ code: number, message: string, reviewId: number, reviewDate: Date }>
        (this.API_URL + 'reviews', review).subscribe(
          response => {
            if (response.code === 201) {
              resolve({
                reviewId: response.reviewId,
                reviewDate: response.reviewDate
              })
              this.alertService.presentAlert("success", "reviewSuccess");
            } else {
              this.alertService.presentAlert("error", "errorOccurred");
            }
          },
          error => {
            //Error
            console.log(error);
            this.alertService.presentAlert("error", "errorOccurred");
          }
        );

    });
  }
}
