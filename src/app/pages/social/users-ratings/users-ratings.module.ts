import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRatingsComponent } from './users-ratings.component';
import { UsersRatingsPageRoutingModule } from './users-ratings-routing.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { IonicModule } from '@ionic/angular';
import { UserRatingComponent } from './user-rating/user-rating.component';
import { UserRatingFormComponent } from './user-rating-form/user-rating-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRatingsPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    UsersRatingsComponent,
    UserRatingComponent,
    UserRatingFormComponent
  ]
})
export class UsersRatingsModule { }
