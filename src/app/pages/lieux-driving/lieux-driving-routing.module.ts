import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LieuxDrivingPage } from './lieux-driving.page';

const routes: Routes = [
  {
    path: '',
    component: LieuxDrivingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LieuxDrivingPageRoutingModule {}
