import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyServicesPage } from './company-services.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyServicesPageRoutingModule {}
