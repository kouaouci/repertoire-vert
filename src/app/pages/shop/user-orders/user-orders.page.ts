import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Cart } from 'src/app/shared/Cart.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.page.html',
  styleUrls: ['./user-orders.page.scss'],
})
export class UserOrdersPage implements OnInit, OnDestroy {

  orders: Cart[] = [];
  private ordersSub: Subscription;

  constructor(
    private ordersService: OrdersService) { }

  ngOnInit() {

    // Get orders
    this.orders = this.ordersService.getOrders();    

    // Subscribe to cart updates
    this.ordersSub = this.ordersService.getOrdersUpdateListener().subscribe(orders => {
      this.orders = orders;
    });
  }

  ionViewDidEnter() {
    //this.getOrderByUser()
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }

}