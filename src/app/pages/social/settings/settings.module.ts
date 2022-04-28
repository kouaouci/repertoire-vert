import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { SettingItemComponent } from './setting-item/setting-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    SettingsPage,
    SettingItemComponent
  ]
})
export class SettingsPageModule {}
