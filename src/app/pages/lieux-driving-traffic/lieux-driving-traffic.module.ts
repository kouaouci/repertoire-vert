import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LieuxDrivingTrafficPageRoutingModule } from './lieux-driving-traffic-routing.module';

import { LieuxDrivingTrafficPage } from './lieux-driving-traffic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LieuxDrivingTrafficPageRoutingModule
  ],
  declarations: [LieuxDrivingTrafficPage]
})
export class LieuxDrivingTrafficPageModule {}
