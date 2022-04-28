import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { MenuRoutingModule } from './menu.routing';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { MenuIconComponent } from './menu-icon/menu-icon/menu-icon.component';
import { UserStatsPageModule } from '../user-info/user-stats/user-stats.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    MenuRoutingModule,
    SharedComponentsModule,
    UserStatsPageModule,
  ],
  declarations: [
    MenuComponent, 
    MenuIconComponent
  ]
})
export class MenuModule { }
