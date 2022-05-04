import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { SubcategoryPageRoutingModule } from './subcategory-routing.module';

import { SubcategoryPage } from './subcategory.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { SubcategoryCompanyComponent } from './subcategory-company/subcategory-company.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcategoryPageRoutingModule,
    SharedComponentsModule
  ],
  providers:[NavParams],
  declarations: [
    SubcategoryPage,
    SubcategoryCompanyComponent
  ]
})
export class SubcategoryPageModule {}
