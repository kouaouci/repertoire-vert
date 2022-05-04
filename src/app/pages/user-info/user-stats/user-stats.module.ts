import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserStatsPageRoutingModule } from './user-stats-routing.module';

import { UserStatsPage } from './user-stats.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmpreinteCo2Component } from './empreinte-co2/empreinte-co2/empreinte-co2.component';
import { InfoCardComponent } from './info-card/info-card/info-card.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { NewsComponent } from './news/news.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    IonicModule,
    UserStatsPageRoutingModule,
    SharedComponentsModule,
    SwiperModule
  ],
  declarations: [
    UserStatsPage, 
    EmpreinteCo2Component,
    InfoCardComponent,
    NewsComponent
  ],
  exports: [
    EmpreinteCo2Component,
    UserStatsPage
  ]
})
export class UserStatsPageModule {}
