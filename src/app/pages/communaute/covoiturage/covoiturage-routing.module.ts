import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CovoiturageOffreComponent } from './covoiturage-offre/covoiturage-offre.component';

import { CovoiturageComponent } from './covoiturage.component';

const routes: Routes = [
  {
    path: '',
    component: CovoiturageComponent
  },
  {
    path: 'new',
    component: CovoiturageOffreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CovoiturageRoutingModule {}
