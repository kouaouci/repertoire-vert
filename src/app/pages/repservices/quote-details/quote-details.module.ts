import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteDetailsPageRoutingModule } from './quote-details-routing.module';

import { QuoteDetailsPage } from './quote-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QuoteDetailsPageRoutingModule
  ],
  declarations: [QuoteDetailsPage]
})
export class QuoteDetailsPageModule {}
