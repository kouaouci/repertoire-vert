import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopCartPageRoutingModule } from './shop-cart-routing.module';

import { ShopCartPage } from './shop-cart.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ShopCartItemComponent } from './shop-cart-item/shop-cart-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShopCartPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    ShopCartPage,
    ShopCartItemComponent
  ]
})
export class ShopCartPageModule {}
