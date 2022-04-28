import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserOrdersPageRoutingModule } from './user-orders-routing.module';

import { UserOrdersPage } from './user-orders.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { OrderComponent } from './order/order.component';
import { OrderItemComponent } from './order-item/order-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserOrdersPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    UserOrdersPage,
    OrderComponent,
    OrderItemComponent
  ]
})
export class UserOrdersPageModule {}
