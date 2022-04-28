import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteProduct } from 'src/app/shared/favoriteProduct.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  REP_VERT_API = environment.url + 'api/';
  //REP_VERT_API_REAL = "https://www.repertoirevert.org/api/";

  constructor(private http: HttpClient) { }

  getUserFavoriteProducts(userId: number): Observable<FavoriteProduct[]> {
    return this.http.get<FavoriteProduct[]>(this.REP_VERT_API + "users/" + userId + "/favoriteProducts");
  }

  getUserFavoriteProductsWithInfo(userId: number): Observable<FavoriteProduct[]> {
    return this.http.get<FavoriteProduct[]>(this.REP_VERT_API + "users/" + userId + "/favoriteProductsInfo");
  }

  addProductToFavorites(productId: number, userId: number): Observable<any> {
    const reqBody = {
      productId: productId
    };
    return this.http.post<any>(
      this.REP_VERT_API + "users/" + userId + "/favoriteProducts", reqBody);
  }

  removeFromFavorites(productId: number, userId: number): Observable<any> {
    return this.http.delete<any>(
      this.REP_VERT_API + "users/" + userId + "/favoriteProducts/" + productId);
  }

  checkProductIsFavorite(userId: number, productId: number): Observable<any> {
    return this.http.get<any>(
      this.REP_VERT_API + "users/" + userId + "/favoriteProducts/" + productId);
  }
}
