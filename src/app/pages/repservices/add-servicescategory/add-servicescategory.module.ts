import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddServicescategoryPageRoutingModule } from './add-servicescategory-routing.module';

import { AddServicescategoryPage } from './add-servicescategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddServicescategoryPageRoutingModule
  ],
  declarations: [AddServicescategoryPage]
})
export class AddServicescategoryPageModule {}
