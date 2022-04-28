import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowPostPageRoutingModule } from './show-post-routing.module';

import { ShowPostPage } from './show-post.page';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { CommentFormComponent } from './comment-form/comment-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShowPostPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [
    ShowPostPage,
    PostCommentComponent,
    CommentFormComponent
  ]
})
export class ShowPostPageModule {}
