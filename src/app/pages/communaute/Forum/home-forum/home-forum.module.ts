import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeForumPageRoutingModule } from './home-forum-routing.module';

import { HomeForumPage } from './home-forum.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ForumPostComponent } from '../forum-post/forum-post/forum-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    HomeForumPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    HomeForumPage,
    ForumPostComponent
  ]
})
export class HomeForumPageModule {}
