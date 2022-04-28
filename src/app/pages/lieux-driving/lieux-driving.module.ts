import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LieuxDrivingPageRoutingModule } from './lieux-driving-routing.module';

import { LieuxDrivingPage } from './lieux-driving.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LieuxDrivingPageRoutingModule
  ],
  declarations: [LieuxDrivingPage]
})
export class LieuxDrivingPageModule {}
