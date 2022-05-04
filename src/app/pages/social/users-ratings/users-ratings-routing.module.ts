import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersRatingsComponent } from './users-ratings.component';

const routes: Routes = [
  {
    path: '',
    component: UsersRatingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRatingsPageRoutingModule {}
