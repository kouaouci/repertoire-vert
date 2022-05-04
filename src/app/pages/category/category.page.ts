import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FavoriteCategoryService } from 'src/app/services/favorites/favoriteCategory.service';
import { Category } from 'src/app/shared/category.model';
import { FavoriteCategory } from 'src/app/shared/FavoriteCategory.model';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  // Categories
  categories: Category[];
  
  // Favorite categories
  favorites: FavoriteCategory[];

  isLoading = true;

  constructor(
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private favoriteCategoryService: FavoriteCategoryService) {}

  ngOnInit() {

    // Get categories
    this.loadCategories();
  }

  loadCategories(){
    this.categoriesService.getCategories().subscribe(
      data => {  
        // Get categories
        this.categories = data;

        // Get user favorite categories
        this.getFavoriteCategories();

        this.isLoading = false;      
      },
      err => {
        this.isLoading = false;
        console.error("[CategoriesPage] Error: ", err)
      }
    );
  }

  getFavoriteCategories() {
    let userId = this.authService.getAuthenticatedUser().id;

    this.favoriteCategoryService.getFavoriteCategories(userId).then(result => {
      if (result) {
        this.favorites = result;

        // Set favorite categories
        this.favorites.forEach( f => {
          let category = f.category as Category;
          let index = this.getCategoryIndex(category.id);
          
          if (index !== -1) {
            this.categories[index].favorite = true;
          }
        })
      }
    });
  }

  handleClick(categoryId: number) {
    let index = this.getCategoryIndex(categoryId);

    if (this.categories[index].favorite) {
      // Remove category from favorites
      this.removeFromFavorites(categoryId);
    } else {
      // Add category to favorites
      this.addToFavorite(categoryId)
    }
  }

  addToFavorite(categoryId: number) {
    let userId = this.authService.getAuthenticatedUser().id;

    // Create new favorite category 
    let favoriteCategory: FavoriteCategory = {
      user: userId,
      category: categoryId
    }

    // Add to DB
    this.favoriteCategoryService.addFavoriteCategory(favoriteCategory)
    .then( result => {
      if (result) {
        // Add new category to favorites
        this.favorites.push(result);

        // Set favorite category to true
        let index = this.getCategoryIndex(categoryId);
        this.categories[index].favorite = true;
      }
    });
  }

  removeFromFavorites(categoryId: number) {
    // Get favorite category index
    let index = this.getFavoriteCategoryIndex(categoryId);

    if (index !== -1) {
      // Get favorite id
      let favoriteId = this.favorites[index].id;

      // Remove favorite category
      this.favoriteCategoryService.removeFavoriteCategory(favoriteId).then(result => {
        if (result) {
          // Remove from favorites
          this.favorites.splice(index, 1);

          // Set category favorite to false
          let categoryIndex = this.getCategoryIndex(categoryId);
          this.categories[categoryIndex].favorite = false;
        }
      })
    }
  }

  getCategoryIndex(categoryId: number) {
    // Return the index of the category in categories
    let index = this.categories.findIndex(c => {
      return c.id === categoryId;
    });
    return index;
  }

  getFavoriteCategoryIndex(categoryId: number) {
    // Return the index of the category in categories
    let index = this.favorites.findIndex(f => {
      let category = f.category as Category;
      return category.id === categoryId || f.category === categoryId;
    });
    return index;
  }
}
