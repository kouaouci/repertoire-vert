import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { Cart } from 'src/app/shared/Cart.model';
import { Cartline } from 'src/app/shared/Cartline.model';
import { Product } from 'src/app/shared/Product.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';
import { AuthService } from '../auth/auth.service';

import { ProductService } from '../products/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  API_URL = environment.url + 'api/';

  private currentCartId: number;
  private cart: Cartline[] = [];
  private cartUpdated = new Subject<Cartline[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertService: AlertService) { }

  initializeCart() {

    let userId = this.authService.getAuthenticatedUser().id;

    // Create new cart for user if does not exist or return exisitng
    this.http.get<{status: number, code: string, cart: Cart}>
    (this.API_URL + 'users/' + userId + '/cart').subscribe(
      response => {        

        // Set user's current cart id
        this.currentCartId = response.cart.id;

        // Get cartlines
        this.cart = [];
        this.cartUpdated.next([...this.cart]);

        response.cart.cartlines.forEach(c => {
          this.cart.push(c);
          this.cartUpdated.next([...this.cart]);
        });

        // Get product info for each cartline in cart
        /*response.cartlines.forEach(cartline => {
          this.productService.getProduct(cartline.produit).subscribe(
            response => {

              // Insert product info in cartline and add to cart array
              cartline.produitInfo = response[0];
              this.cart.push(cartline);
              this.cartUpdated.next([...this.cart]);
            },
            error => {
              console.log(error);
            });
        });*/
      },
      error => {
        console.log(error);
      }
    );
  }


  getCurrentCartId() {
    return this.currentCartId;
  }


  getCart(): Cartline[] {
    // Return cart of user
    return [...this.cart];
  }


  getCartUpdateListener() {
    // Return observable for components interested in cart changes
    return this.cartUpdated.asObservable();
  }


  getProductCartline(productId: number): Observable<any> {

    let userId = this.authService.getAuthenticatedUser().id;

    // Return cartline with product id in user's cart
    return this.http.get(this.API_URL + 'users/' + userId + '/cartProducts/' + productId);
  }


  addToCart(productId: number, quantity: number, product?: Product): void {

    let userId = this.authService.getAuthenticatedUser().id;

    // Add product request
    this.http.post<{ status: number, content: any }>(this.API_URL + 'users/' +  userId + '/cartProducts/' + productId, {quantity: quantity})
      .subscribe(response => {

        if (response.status === 200) {
          // Find cart index if product already added
          const index = this.cart.findIndex(cartline => {
            let product = cartline.produit as Product;
            return product.id === productId;
          });

          // Increment cartline quantity or add new on success
          if (index !== -1) {
            this.cart[index].quantity += quantity;
          } else {
            let newCartline: Cartline = response.content;
            newCartline.produit = product;
            this.cart.push(response.content);
          }

          // Emit cart update
          this.cartUpdated.next([...this.cart]);
        } else {
          this.alertService.presentAlert("error", "errorOccurred");
        }
      },
        error => {
          console.log(error);
        });
  }


  removeFromCart(productId: number, index: number): void {

    let userId = this.authService.getAuthenticatedUser().id;

    // Remove product request
    this.http.delete<{code: number, message: string}>(
      this.API_URL + 'users/' + userId + '/cartProducts/' + productId + '/single'
    ).subscribe(response => {
      if (response.code === 200) {
        // Decrease cart quantity and update cart
        this.cart[index].quantity--;
        this.cartUpdated.next([...this.cart]);
      } else {
        this.alertService.presentAlert("error", "errorOccurred");
      }
    },
      error => {
        console.log(error);
        this.alertService.presentAlert("error", "errorOccurred");
      });
  }


  removeAllFromCart(productId: number, index: number): void {

    let userId = this.authService.getAuthenticatedUser().id;

    // Remove product request
    this.http.delete<{code: number, message: string}>(
      this.API_URL + 'users/' + userId + '/cartProducts/' + productId + '/all'
    ).subscribe(response => {
      if (response.code === 200) {
        // Completely remove from cart and update
        this.cart.splice(index, 1);
        this.cartUpdated.next([...this.cart]);
      } else {
        this.alertService.presentAlert("error", "errorOccurred");
      }
    },
      error => {
        console.log(error);
        this.alertService.presentAlert("error", "errorOccurred");
      });
  }
}
