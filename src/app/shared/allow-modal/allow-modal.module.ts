import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllowModalPageRoutingModule } from './allow-modal-routing.module';

import { AllowModalPage } from './allow-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllowModalPageRoutingModule
  ],
  declarations: [AllowModalPage]
})
export class AllowModalPageModule {}
