import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Co2TutorialPage } from './co2-tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: Co2TutorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Co2TutorialPageRoutingModule {}
