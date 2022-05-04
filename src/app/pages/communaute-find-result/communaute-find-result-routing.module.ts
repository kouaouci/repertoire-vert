import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunauteFindResultPage } from './communaute-find-result.page';

const routes: Routes = [
  {
    path: '',
    component: CommunauteFindResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunauteFindResultPageRoutingModule {}
