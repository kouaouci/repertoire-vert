import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserFavoritesPageRoutingModule } from './user-favorites-routing.module';

import { UserFavoritesPage } from './user-favorites.page';
import { FavoriteRowComponent } from './favorite-row/favorite-row.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserFavoritesPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    UserFavoritesPage,
    FavoriteRowComponent
  ],
  exports: [UserFavoritesPage]
})
export class UserFavoritesPageModule {}
