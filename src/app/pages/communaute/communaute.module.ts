import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunautePageRoutingModule } from './communaute-routing.module';

import { CommunautePage } from './communaute.page';
import { TabPageModule } from '../tab/tab.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CommunautePageRoutingModule,
    TabPageModule,
    SharedComponentsModule
  ],
  declarations: [
    CommunautePage,
  ]
})
export class CommunautePageModule {}
