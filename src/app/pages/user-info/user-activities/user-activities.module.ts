import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserActivitiesPageRoutingModule } from './user-activities-routing.module';
import { UserActivitiesPage } from './user-activities.page';

import { NgxPaginationModule } from 'ngx-pagination';
import { ListActivitiesComponent } from './list-activities/list-activities/list-activities.component';
import { ActivityItemComponent } from './activity-item/activity-item.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    IonicModule,
    UserActivitiesPageRoutingModule,
    SharedComponentsModule
  ],
  providers: [
    NgxPaginationModule,
  ],
  declarations: [
    UserActivitiesPage,
    ListActivitiesComponent,
    ActivityItemComponent
  ],
  exports: [
    UserActivitiesPage
  ]
})
export class UserActivitiesPageModule {}
