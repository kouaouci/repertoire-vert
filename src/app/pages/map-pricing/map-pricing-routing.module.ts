import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapPricingPage } from './map-pricing.page';

const routes: Routes = [
  {
    path: '',
    component: MapPricingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPricingPageRoutingModule {}
