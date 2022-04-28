import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyCatgoriesPage } from './company-catgories.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyCatgoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyCatgoriesPageRoutingModule {}
