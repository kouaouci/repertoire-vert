import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovoiturageComponent } from './covoiturage.component';
import { CovoiturageRoutingModule } from './covoiturage-routing.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CovoiturageOffreComponent } from './covoiturage-offre/covoiturage-offre.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CovoiturageRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [
    CovoiturageComponent,
    CovoiturageOffreComponent
  ]
})
export class CovoiturageModule { }
