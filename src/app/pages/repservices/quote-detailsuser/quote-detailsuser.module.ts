import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteDetailsuserPageRoutingModule } from './quote-detailsuser-routing.module';

import { QuoteDetailsuserPage } from './quote-detailsuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    QuoteDetailsuserPageRoutingModule
  ],
  declarations: [QuoteDetailsuserPage]
})
export class QuoteDetailsuserPageModule {}
