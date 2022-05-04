import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteCategory } from 'src/app/shared/FavoriteCategory.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCategoryService {

  REP_VERT_API = environment.url + 'api/';
  //REP_VERT_API_REAL = "https://www.repertoirevert.org/api/";

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getFavoriteCategories(userId: number): Promise<FavoriteCategory[]> {
    return new Promise((resolve, reject) => {
      this.http.get<{code: number, message: string, favoriteCategories: FavoriteCategory[]}>
      (this.REP_VERT_API + 'users/' + userId + '/favoriteCategories').subscribe(
        response => {
          if (response.code === 200) {
            resolve(response.favoriteCategories);
          } else {
            reject();
            this.alertService.presentAlert('error', 'errorOccurred');
          }
        },
        error => {
          reject();
          this.alertService.presentAlert('error', 'errorOccurred');
        }
      )
    });
  }

  addFavoriteCategory(favoriteCategory: FavoriteCategory): Promise<FavoriteCategory> {
    return new Promise((resolve, reject) => {
      this.http.post<{code: number, message: string, favoriteCategory: FavoriteCategory}>
      (this.REP_VERT_API + 'users/' + favoriteCategory.user + '/favoriteCategories', favoriteCategory).subscribe(
        response => {
          if (response.code === 201) {
            resolve(response.favoriteCategory);
          } else {
            reject();
            this.alertService.presentAlert('error', 'errorOccurred');
          }
        },
        error => {
          reject();
          this.alertService.presentAlert('error', 'errorOccurred');
        }
      )
    });
  }

  removeFavoriteCategory(favoriteId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete<{code: number, message: string}>
      (this.REP_VERT_API + 'favoriteCategories/' + favoriteId).subscribe(
        response => {
          if (response.code === 200) {
            resolve(true);
          } else {
            reject();
            this.alertService.presentAlert('error', 'errorOccurred');
          }
        },
        error => {
          reject();
          this.alertService.presentAlert('error', 'errorOccurred');
        }
      )
    });
  }
}
