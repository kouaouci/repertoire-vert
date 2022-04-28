import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFavoritesPage } from './user-favorites.page';

const routes: Routes = [
  {
    path: '',
    component: UserFavoritesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserFavoritesPageRoutingModule {}
