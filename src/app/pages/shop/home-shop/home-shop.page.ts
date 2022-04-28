import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { FavoriteService } from 'src/app/services/favorites/favorite.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Cartline } from 'src/app/shared/Cartline.model';
import { FavoriteProduct } from 'src/app/shared/favoriteProduct.model';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.page.html',
  styleUrls: ['./home-shop.page.scss'],
})
export class HomeShopPage implements OnInit, OnDestroy {

  option = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
  };

  userId = parseInt(localStorage.getItem('repVertId'));
  userFavorites: FavoriteProduct[];
  products: Product[];

  filterTerm: string;

  cart: Cartline[];
  cartSub: Subscription;
  cartNbProducts = 0;

  constructor(
    private productService: ProductService,
    private favoriteService: FavoriteService,
    private cartService: CartService,
    public alertController: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {

    // Get products
    this.getAllProducts();

    // Get cart
    this.cart = this.cartService.getCart();

    // Get Number of products in cart
    this.getCartNbProducts();

    // Subscribe to cart updates
    this.cartSub = this.cartService.getCartUpdateListener().subscribe(cart => {
      this.cart = cart;
      this.getCartNbProducts();
    });
  }

  ionViewDidEnter() {
    this.getUserFavorites();
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }

  handleSearch(search: string) {
    this.filterTerm = search;
  }

  getAllProducts() {
    this.products = [];
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCartNbProducts() {
    this.cartNbProducts = this.cart.reduce((a, b) => {
      return a + b['quantity'];
    }, 0);
  }

  getUserFavorites() {
    this.userFavorites = [];
    const id = parseInt(localStorage.getItem('repVertId'));
    this.favoriteService.getUserFavoriteProducts(id).subscribe(
      response => {
        response.forEach(favorite => {

          // Get product from user favorites, if exists
          const index = this.products.findIndex(p => p.id === favorite.product);

          if (index > -1) {
            this.products[index].isFavorite = true;
          }
          this.userFavorites.push(favorite);
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
