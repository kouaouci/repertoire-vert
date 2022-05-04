import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PricingPageRoutingModule } from './pricing-routing.module';

import { PricingPage } from './pricing.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PricingPageRoutingModule,
    SuperTabsModule,
    SharedComponentsModule
  ],
  declarations: [PricingPage]
})
export class PricingPageModule {}
