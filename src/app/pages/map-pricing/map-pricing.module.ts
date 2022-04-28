import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPricingPageRoutingModule } from './map-pricing-routing.module';

import { MapPricingPage } from './map-pricing.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,

    MapPricingPageRoutingModule
  ],
  declarations: [MapPricingPage]
})
export class MapPricingPageModule {}
