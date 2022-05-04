import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from 'src/app/shared/Company.model';
import { Product } from 'src/app/shared/Product.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  REP_VERT_API = environment.url + 'api/';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getLatestCompaniesAndProducts(filter: string): Promise<{companies: Company[], products: Product[]}> {
    return new Promise((resolve, reject) => {
      this.http.get<{ code: number, message: string, companies: Company[], products: Product[] }>
        (this.REP_VERT_API + 'news/' + filter).subscribe( response => {

            if (response.code === 200) {
              resolve({
                companies: response.companies,
                products: response.products
              });
            } else {
              reject();
            }
          },
          error => {
            reject();
            console.log(error);
          }
        )
    });
  }
}
