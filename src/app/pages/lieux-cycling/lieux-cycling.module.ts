import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LieuxCyclingPageRoutingModule } from './lieux-cycling-routing.module';

import { LieuxCyclingPage } from './lieux-cycling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LieuxCyclingPageRoutingModule
  ],
  declarations: [LieuxCyclingPage]
})
export class LieuxCyclingPageModule {}
