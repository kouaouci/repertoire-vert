import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { TabPageModule } from '../../tab/tab.module';
import { StatRowComponent } from './stat-row/stat-row.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    HomePageRoutingModule,
    TabPageModule
  ],
  declarations: [
    HomePage,
    StatRowComponent
  ]
})
export class HomePageModule {}
