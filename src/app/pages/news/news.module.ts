import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news.routing';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NewsRoutingModule,
    SharedComponentsModule,
    SwiperModule
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
