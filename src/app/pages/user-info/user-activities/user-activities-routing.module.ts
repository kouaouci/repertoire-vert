import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserActivitiesPage } from './user-activities.page';

const routes: Routes = [
  {
    path: '',
    component: UserActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserActivitiesPageRoutingModule {}
