import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LieuxResultsPageRoutingModule } from './lieux-results-routing.module';

import { LieuxResultsPage } from './lieux-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LieuxResultsPageRoutingModule
  ],
  declarations: [LieuxResultsPage]
})
export class LieuxResultsPageModule {}
