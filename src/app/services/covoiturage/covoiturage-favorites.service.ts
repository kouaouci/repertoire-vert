import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CovFavorite } from 'src/app/shared/CovFavorite.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageFavoritesService {

  REP_VERT_API = environment.url + 'api/';

  constructor(
    private http: HttpClient,
    private alertService: AlertService) { }

  
  getFavorites(id: number): Promise<CovFavorite[]> {
    return new Promise((resolve, reject) => {
      this.http.get<{ code: number, message: string, favorites: CovFavorite[]}>
      (this.REP_VERT_API + 'users/' + id + '/covFavorites')
      .subscribe(
        response => {
          if (response.code === 200) {
            resolve(response.favorites);
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
      )
    });
  }

  addFavorite(favorite: CovFavorite): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post<{code: number, message: string, favoriteId: number}>
      (this.REP_VERT_API + 'users/' + favorite.user + '/covFavorites', favorite)
      .subscribe(
        response => {
          if (response.code === 201) {
            resolve(response.favoriteId);
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
      )
    })
  }

  removeFavorite(favoriteId: number): Promise<boolean> {
    let userId = parseInt(localStorage.getItem('repVertId'));
    return new Promise((resolve, reject) => {
      this.http.delete<{code: number, message: string}>
      (this.REP_VERT_API + 'users/' + userId + '/covFavorites/' + favoriteId)
      .subscribe( response => {
        if (response.code === 200) {
          resolve(true);
        } else {
          this.alertService.presentAlert("error", "errorOccurred");
          resolve(false);
        }
      },
      error => {
        console.log(error);
        this.alertService.presentAlert("error", "errorOccurred");
        reject();
      })
    });
  }
}
