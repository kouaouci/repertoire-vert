import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Merchandise } from 'src/app/shared/Merchandise.model';
import { Product } from 'src/app/shared/Product.model';
import { Service } from 'src/app/shared/Service.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  REP_VERT_REST = environment.url + 'rest/';
  REP_VERT_API = environment.url + 'api/';
  //REP_VERT_API_REAL = "https://www.repertoirevert.org/rest/";

  IMG_URL = environment.url + 'uploads/products/';

  constructor(
    private http: HttpClient,
    private alertService: AlertService) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.REP_VERT_REST + "product");
  }

  getProduct(id: number) {
    return this.http.get(this.REP_VERT_API + "products/" + id);
  }

  addProduct(product: Merchandise | Service, type: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post<{code: number, message: string, merchandise: number, service: number}>
      (this.REP_VERT_API + type, product).subscribe( response => {

        if (response.code === 201) {
          this.alertService.presentAlert("success", "productAdded");

          if (type === 'products') {
            resolve(response.merchandise);
          } else {
            resolve(response.service);
          }
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

  deleteProduct(productId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete<{code: number, message: string}>
      (this.REP_VERT_API + 'products/' + productId).subscribe( response => {
        if (response.code === 200) {
          resolve(true);
        } else {
          reject();
        }
      },
      error => {
        console.log(error);
        reject();
        this.alertService.presentAlert('error', 'errorOccurred');
      });
    })
  }

  updateProduct(product: Merchandise | Service): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.put(this.REP_VERT_API + 'products/' + product.id, product)
        .subscribe( () => {
          resolve(true);
        },
        error => {
          console.log(error);
          reject();
          this.alertService.presentAlert('error', 'errorOccurred');
        })
    })
  }
}
