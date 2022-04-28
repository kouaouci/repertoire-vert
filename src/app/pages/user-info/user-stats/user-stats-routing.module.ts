import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserStatsPage } from './user-stats.page';

const routes: Routes = [
  {
    path: '',
    component: UserStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserStatsPageRoutingModule {}
