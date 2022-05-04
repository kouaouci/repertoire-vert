import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LieuxDrivingTrafficPage } from './lieux-driving-traffic.page';

const routes: Routes = [
  {
    path: '',
    component: LieuxDrivingTrafficPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LieuxDrivingTrafficPageRoutingModule {}
