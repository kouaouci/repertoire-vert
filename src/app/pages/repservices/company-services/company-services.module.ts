import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyServicesPageRoutingModule } from './company-services-routing.module';

import { CompanyServicesPage } from './company-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyServicesPageRoutingModule
  ],
  declarations: [CompanyServicesPage]
})
export class CompanyServicesPageModule {}
