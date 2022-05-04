import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Company } from 'src/app/shared/Company.model';
import { FavoriteCompany } from 'src/app/shared/FavoriteCompany.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCompanyService {

  REP_VERT_API = environment.url + 'api/';

  private favorites: FavoriteCompany[] = [];
  private favoritesUpdated = new Subject<FavoriteCompany[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  getFavoriteCompanies(): FavoriteCompany[] {
    // Return cart of user
    return [...this.favorites];
  }


  getFavoritesUpdateListener() {
    // Return observable for components interested in favorites changes
    return this.favoritesUpdated.asObservable();
  }


  initializeFavoriteCompanies(): void{
    
    // Get connected user id
    let userId = this.authService.getAuthenticatedUser().id;

    this.http.get<{code: number, message: string, favoriteCompanies: FavoriteCompany[]}>
    (this.REP_VERT_API + 'users/' + userId + '/favoriteCompanies').subscribe(
      response => {
        if (response.code === 200) {
          // Set user favorite companies and notify subscribers
          this.favorites = response.favoriteCompanies;
          this.favoritesUpdated.next([...this.favorites]);
        } else {
          this.alertService.presentAlert('error', 'errorOccurred');
        }
      },
      error => {
        this.alertService.presentAlert('error', 'errorOccurred');
      }
    );
  }


  addFavoriteCompany(favoriteCompany: FavoriteCompany, company: Company): Promise<FavoriteCompany> {
    return new Promise((resolve, reject) => {
      this.http.post<{code: number, message: string, favoriteCompany: FavoriteCompany}>
      (this.REP_VERT_API + 'users/' + favoriteCompany.user + '/favoriteCompanies', favoriteCompany).subscribe(
        response => {
          if (response.code === 201) {

            // Update new favorite company id and company
            favoriteCompany.id = response.favoriteCompany.id;
            favoriteCompany.company = company;

            // Add new favorite company to list and notify subscribers
            this.favorites.push(favoriteCompany);
            this.favoritesUpdated.next([...this.favorites]);
            resolve(response.favoriteCompany);

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


  removeFavoriteCompany(favoriteId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete<{code: number, message: string}>
      (this.REP_VERT_API + 'favoriteCompanies/' + favoriteId).subscribe(
        response => {
          if (response.code === 200) {
            
            // Remove favorite company from list and notify subscribers
            let index = this.favorites.findIndex(f => {
              return f.id === favoriteId;
            });
            this.favorites.splice(index, 1);
            this.favoritesUpdated.next([...this.favorites]);
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
