import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LieuxResultsPage } from './lieux-results.page';

const routes: Routes = [
  {
    path: '',
    component: LieuxResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LieuxResultsPageRoutingModule {}
