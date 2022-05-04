import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorites/favorite.service';
import { FavoriteCompanyService } from 'src/app/services/favorites/favoriteCompany.service';
import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
import { FavoriteCompany } from 'src/app/shared/FavoriteCompany.model';
import { FavoriteProduct } from 'src/app/shared/favoriteProduct.model';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.page.html',
  styleUrls: ['./user-favorites.page.scss'],
})
export class UserFavoritesPage implements OnInit {

  // Favorite products and companies
  favoriteProducts: FavoriteProduct[];
  favoriteCompanies: FavoriteCompany[];

  constructor(
    private favoriteService: FavoriteService,
    private favoriteCompanyService: FavoriteCompanyService) { }

  ngOnInit() {

    // Get user company favorites
    this.favoriteCompanies = this.favoriteCompanyService.getFavoriteCompanies();

    // Listen for favorite companies updates
    this.favoriteCompanyService.getFavoritesUpdateListener().subscribe(favorites => {
      this.favoriteCompanies = favorites;
    });
  }

  getFavoriteProducts() {

    const id = parseInt(localStorage.getItem('repVertId'));
    this.favoriteService.getUserFavoriteProductsWithInfo(id).subscribe(
      response => {
        this.favoriteProducts = response;
      },
      error => {
        console.log(error);
      }
    );
  }

}
