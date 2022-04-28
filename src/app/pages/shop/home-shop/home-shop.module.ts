import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeShopPageRoutingModule } from './home-shop-routing.module';

import { HomeShopPage } from './home-shop.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    HomeShopPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    HomeShopPage,
    ProductCardComponent
  ]
})
export class HomeShopPageModule {}
