import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { NotificationCardComponent } from './notification-card/notification-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    NotificationsPage,
    NotificationCardComponent]
})
export class NotificationsPageModule {}
