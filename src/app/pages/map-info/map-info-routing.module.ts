import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapInfoPage } from './map-info.page';

const routes: Routes = [
  {
    path: '',
    component: MapInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapInfoPageRoutingModule {}
