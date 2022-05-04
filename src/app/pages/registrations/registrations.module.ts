import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationsComponent } from './registrations.component';
import { RegistrationsRoutingModule } from './registrations.routing';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegistrationsRoutingModule,
    SharedComponentsModule,
    SwiperModule
  ],
  declarations: [RegistrationsComponent]
})
export class RegistrationsModule { }
