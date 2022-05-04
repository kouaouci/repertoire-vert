import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PricingProductsPage } from './pricing-products.page';

const routes: Routes = [
  {
    path: '',
    component: PricingProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricingProductsPageRoutingModule {}
