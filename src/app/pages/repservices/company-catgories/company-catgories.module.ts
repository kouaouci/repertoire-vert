import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyCatgoriesPageRoutingModule } from './company-catgories-routing.module';

import { CompanyCatgoriesPage } from './company-catgories.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    CompanyCatgoriesPageRoutingModule
  ],
  declarations: [CompanyCatgoriesPage]
})
export class CompanyCatgoriesPageModule {}
