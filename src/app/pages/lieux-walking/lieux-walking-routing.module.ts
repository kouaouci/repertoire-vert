import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LieuxWalkingPage } from './lieux-walking.page';

const routes: Routes = [
  {
    path: '',
    component: LieuxWalkingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LieuxWalkingPageRoutingModule {}
