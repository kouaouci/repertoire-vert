import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ReviewsComponent } from './reviews.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    ReviewsRoutingModule
  ],
  declarations: [
    ReviewsComponent,
    UserReviewComponent,
    UserReviewsComponent
  ]
})
export class ReviewsModule {}