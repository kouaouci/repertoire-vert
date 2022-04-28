import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteDetailsuserPage } from './quote-detailsuser.page';

const routes: Routes = [
  {
    path: '',
    component: QuoteDetailsuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteDetailsuserPageRoutingModule {}
