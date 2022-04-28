import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Cart } from 'src/app/shared/Cart.model';
import { Cartline } from 'src/app/shared/Cartline.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  API_URL = environment.url + 'api/';

  private orders: Cart[] = [];
  private ordersUpdated = new Subject<Cart[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cartService: CartService,
    private alertService: AlertService,
    private alertController: AlertController) { }

  
  getUserId() {
    // Return id of current connected user
    return this.authService.getAuthenticatedUser().id;
  }


  initializeOrders() {
    // Reset orders
    this.orders = [];

    this.http.get<{code: number, content: any}>(this.API_URL + 'users/' + this.getUserId() + '/orders')
    .subscribe( response => {
      if (response.code === 200) {

        // Update user orders
        this.orders = response.content;
        this.ordersUpdated.next([...this.orders]);

      } else {
        this.alertService.presentAlert("error", "errorOccurred");
      }
    },
    error => {
      console.log(error);
      this.alertService.presentAlert("error", "errorOccurred");
    })
  }

  changeOrderStatus(cartId: number, status: string, total: number, cartlines: Cartline[]) {
    this.http.put<{code: number, content: any}>(
      this.API_URL + 'users/' + this.getUserId() + '/carts/' + cartId + '/' + status, {total: total}
    ).subscribe( response => {
      if (response.code === 200) {

        if (status === 'confirmed') {
          // Add new order to user orders with products info
          let newOrder: Cart = response.content;
          newOrder.cartlines = cartlines; 
          this.orders.unshift(newOrder);

          // Notify orders subscribers
          this.ordersUpdated.next([...this.orders]);

          // Show success message
          this.alertService.presentAlert("success", "orderSuccess");

          // Create new cart for user
          this.cartService.initializeCart();
        }
      } else {
        this.alertService.presentAlert("error", "errorOccurred");
      }
    },
    error => {
      console.log(error);
      this.alertService.presentAlert("error", "errorOccurred");
    });
  }


  getOrders(): Cart[] {
    // Return orders of current user
    return [...this.orders];
  }


  getOrdersUpdateListener() {
    // Return observable for components interested in cart changes
    return this.ordersUpdated.asObservable();
  }
}
