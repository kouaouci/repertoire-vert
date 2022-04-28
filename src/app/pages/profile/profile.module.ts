import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePageComponent } from './profile.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { UserNetworkPageModule } from '../user-info/user-network/user-network.module';
import { UserFavoritesPageModule } from '../user-info/user-favorites/user-favorites.module';
import { UserActivitiesPageModule } from '../user-info/user-activities/user-activities.module';
import { UserStatsPageModule } from '../user-info/user-stats/user-stats.module';
import { UserPreferencesComponent } from '../user-info/user-preferences/user-preferences.component';
import { InformationFormComponent } from '../user-info/user-preferences/information-form/information-form.component';
import { CovoiturageFormComponent } from '../user-info/user-preferences/covoiturage-form/covoiturage-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SuperTabsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedComponentsModule,
    UserNetworkPageModule,
    UserFavoritesPageModule,
    UserActivitiesPageModule,
    UserStatsPageModule
  ],
  declarations: [
    ProfilePageComponent,
    UserPreferencesComponent,
    InformationFormComponent,
    CovoiturageFormComponent
  ]
})
export class ProfilePageModule {}
