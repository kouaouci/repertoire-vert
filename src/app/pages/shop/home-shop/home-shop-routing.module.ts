import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeShopPage } from './home-shop.page';

const routes: Routes = [
  {
    path: '',
    component: HomeShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeShopPageRoutingModule {}
