import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteRequestuserPage } from './quote-requestuser.page';

const routes: Routes = [
  {
    path: '',
    component: QuoteRequestuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteRequestuserPageRoutingModule {}
