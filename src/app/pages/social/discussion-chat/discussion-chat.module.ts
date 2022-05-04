import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscussionChatPageRoutingModule } from './discussion-chat-routing.module';

import { DiscussionChatPage } from './discussion-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DiscussionChatPageRoutingModule
  ],
  declarations: [DiscussionChatPage]
})
export class DiscussionChatPageModule {}
