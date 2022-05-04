import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FavoriteCategoryService } from 'src/app/services/favorites/favoriteCategory.service';
import { FavoriteCategory } from 'src/app/shared/FavoriteCategory.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // Favorite categories
  favorites: FavoriteCategory[];

  constructor(
    private authService: AuthService,
    private favoriteCategoryService: FavoriteCategoryService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // Get user favorite cartegories
    this.getFavoriteCategories();
  }

  getFavoriteCategories() {
    let userId = this.authService.getAuthenticatedUser().id;

    this.favoriteCategoryService.getFavoriteCategories(userId).then(result => {
      if (result) {
        this.favorites = result;
      }
    });
  }
}
