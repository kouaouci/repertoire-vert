import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/shared/Company.model';
import { Product } from 'src/app/shared/Product.model';
import { Review } from 'src/app/shared/Review.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  REST_URL = environment.url + "rest/";
  API_URL = environment.url + "api/";

  IMG_URL = environment.url + 'css/img/company/';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getCompany(id: number): Observable<Company> {
    return this.http.get(this.REST_URL + "company/" + id);
  };

  getCompanyWithCategoriesAndProducts(id: number): Promise<{
    company: Company, reviews: { total: number, average: number },
    productsUserReviews: {product: Product, total: number, average: number}[], 
    productsCompanyReviews: {product: Product, total: number, average: number}[]
  }> {
    return new Promise((resolve, reject) => {
      this.http.get<{
        company: Company, 
        reviews: { total: number, average: number},
        productsUserReviews: {product: Product, total: number, average: number}[],
        productsCompanyReviews: {product: Product, total: number, average: number}[]
      }>
      (this.REST_URL + 'companies/' + id).subscribe(
        response => {
          if (response) {

            let result = {
              company: response.company[0],
              reviews: response.reviews[0],
              productsUserReviews: response.productsUserReviews,
              productsCompanyReviews: response.productsCompanyReviews
            }
            resolve(result); 
          } else {
            reject();
          }
        },
        error => {
          console.log(error);
          reject();
        });
    });
  }

  updateCompany(companyId: number, updates): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.put<{code:number, message:string}>
      (this.API_URL + 'companies/' + companyId, updates).subscribe(
        response => {
          console.log(response);
          if (response.code === 204) {
            resolve(true);
          } else {
            resolve(false);
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
