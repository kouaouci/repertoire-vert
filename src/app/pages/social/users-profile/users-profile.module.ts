import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersProfilePageRoutingModule } from './users-profile-routing.module';

import { UsersProfilePage } from './users-profile.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UsersProfilePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [UsersProfilePage]
})
export class UsersProfilePageModule {}
