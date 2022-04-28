import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LieuxPageRoutingModule } from './lieux-routing.module';

import { LieuxPage } from './lieux.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LieuxPageRoutingModule,
    SuperTabsModule,
    SharedComponentsModule
  ],
  declarations: [LieuxPage]
})
export class LieuxPageModule {}
