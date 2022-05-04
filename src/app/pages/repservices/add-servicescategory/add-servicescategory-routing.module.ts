import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddServicescategoryPage } from './add-servicescategory.page';

const routes: Routes = [
  {
    path: '',
    component: AddServicescategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddServicescategoryPageRoutingModule {}
