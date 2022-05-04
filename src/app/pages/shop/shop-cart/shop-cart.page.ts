import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Cartline } from 'src/app/shared/Cartline.model';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.page.html',
  styleUrls: ['./shop-cart.page.scss'],
})
export class ShopCartPage implements OnInit, OnDestroy {

  option = {
    slidesPerView: 1.4,
    spaceBetween: 0,
    centeredSlides: true,
  };

  cart: Cartline[] = [];
  private cartSub: Subscription;

  total: number = 0;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    public toastController: ToastController,
    public modalController: ModalController) { }

  ngOnInit() {
    // Get cart
    this.cart = this.cartService.getCart();
    this.total = this.getTotal();

    // Subscribe to cart updates
    this.cartSub = this.cartService.getCartUpdateListener().subscribe(cart => {
      this.cart = cart;
      if (this.cart.length > 0) {
        this.total = this.getTotal();
      }      
    });
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }

  getTotal() {
    return this.cart.reduce((a, b) => {
      return a + (b.produit['price'] * b['quantity']);
    }, 0);
  }

  addProduct(id: number) {
    this.cartService.addToCart(id, 1);
  }

  removeProduct(id: number) {
    const index = this.cart.findIndex(cartline => {
      let product = cartline.produit as Product;
      return product.id === id;
    });

    if (this.cart[index].quantity > 0) {
      this.cartService.removeFromCart(id, index);
    }
  }

  removeAllProduct(id: number) {
    const index = this.cart.findIndex(cartline => {
      let product = cartline.produit as Product;
      return product.id === id;
    });

    this.cartService.removeAllFromCart(id, index);

  }

  confirmOrder() { 
    const currentCartId = this.cartService.getCurrentCartId();
    this.ordersService.changeOrderStatus(
      currentCartId, "confirmed", this.total, this.cart
    );
  }
}
