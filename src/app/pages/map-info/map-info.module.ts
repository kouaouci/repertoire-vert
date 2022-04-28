import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapInfoPageRoutingModule } from './map-info-routing.module';

import { MapInfoPage } from './map-info.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapInfoPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [MapInfoPage]
})
export class MapInfoPageModule {}
