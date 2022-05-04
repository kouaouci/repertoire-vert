import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteRequestPageRoutingModule } from './quote-request-routing.module';

import { QuoteRequestPage } from './quote-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuoteRequestPageRoutingModule
  ],
  declarations: [QuoteRequestPage]
})
export class QuoteRequestPageModule {}
