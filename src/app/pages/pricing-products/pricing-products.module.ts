import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PricingProductsPageRoutingModule } from './pricing-products-routing.module';

import { PricingProductsPage } from './pricing-products.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    PricingProductsPageRoutingModule
  ],
  declarations: [PricingProductsPage]
})
export class PricingProductsPageModule {}
