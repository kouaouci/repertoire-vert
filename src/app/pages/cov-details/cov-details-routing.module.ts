import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CovDetailsPage } from './cov-details.page';

const routes: Routes = [
  {
    path: '',
    component: CovDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CovDetailsPageRoutingModule {}
