import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeForumPage } from './home-forum.page';

const routes: Routes = [
  {
    path: '',
    component: HomeForumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeForumPageRoutingModule {}
