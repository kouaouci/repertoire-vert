import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserNetworkPageComponent } from './user-network.page';

const routes: Routes = [
  {
    path: '',
    component: UserNetworkPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserNetworkPageRoutingModule {}
