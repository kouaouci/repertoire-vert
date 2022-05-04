import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CompanyProfilePageComponent } from './company-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyProfilePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [Geolocation],
})
export class CompanyProfilePageRoutingModule {}
