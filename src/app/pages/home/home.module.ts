import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HomeIconComponent } from './components/home-icon/home-icon.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { TabPageModule } from '../tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedComponentsModule,
    TabPageModule
  ],
  declarations: [
    HomePage,
    HomeIconComponent
  ]
})
export class HomePageModule {}
