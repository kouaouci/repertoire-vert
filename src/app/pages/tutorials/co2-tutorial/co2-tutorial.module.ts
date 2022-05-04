import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Co2TutorialPageRoutingModule } from './co2-tutorial-routing.module';

import { Co2TutorialPage } from './co2-tutorial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Co2TutorialPageRoutingModule
  ],
  declarations: [Co2TutorialPage]
})
export class Co2TutorialPageModule {}
