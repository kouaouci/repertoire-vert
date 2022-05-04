import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersStatsComponent } from './users-stats.component';

const routes: Routes = [
  {
    path: '',
    component: UsersStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersStatsPageRoutingModule {}
