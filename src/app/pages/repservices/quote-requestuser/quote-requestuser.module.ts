import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteRequestuserPageRoutingModule } from './quote-requestuser-routing.module';

import { QuoteRequestuserPage } from './quote-requestuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuoteRequestuserPageRoutingModule
  ],
  declarations: [QuoteRequestuserPage]
})
export class QuoteRequestuserPageModule {}
