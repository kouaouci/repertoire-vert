import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllowModalPage } from './allow-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AllowModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllowModalPageRoutingModule {}
