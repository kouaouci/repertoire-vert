import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LieuxPage } from './lieux.page';

const routes: Routes = [
  {
    path: '',
    component: LieuxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LieuxPageRoutingModule {}
