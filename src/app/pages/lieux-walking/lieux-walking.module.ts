import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LieuxWalkingPageRoutingModule } from './lieux-walking-routing.module';

import { LieuxWalkingPage } from './lieux-walking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LieuxWalkingPageRoutingModule
  ],
  declarations: [LieuxWalkingPage]
})
export class LieuxWalkingPageModule {}
