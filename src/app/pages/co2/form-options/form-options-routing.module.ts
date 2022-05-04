import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormOptionsPage } from './form-options.page';

const routes: Routes = [
  {
    path: '',
    component: FormOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormOptionsPageRoutingModule {}
