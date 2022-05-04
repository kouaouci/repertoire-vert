import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationsComponent } from './registrations.component';

const routes: Routes = [
  { 
    path: '',
    component: RegistrationsComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RegistrationsRoutingModule {}
