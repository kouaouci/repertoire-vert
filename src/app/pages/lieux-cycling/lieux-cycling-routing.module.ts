import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LieuxCyclingPage } from './lieux-cycling.page';

const routes: Routes = [
  {
    path: '',
    component: LieuxCyclingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LieuxCyclingPageRoutingModule {}
