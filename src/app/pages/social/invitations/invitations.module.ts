import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationsPageRoutingModule } from './invitations-routing.module';

import { InvitationsPage } from './invitations.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { FriendRequestCardComponent } from './friend-request-card/friend-request-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationsPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    InvitationsPage,
    FriendRequestCardComponent
  ]
})
export class InvitationsPageModule {}
