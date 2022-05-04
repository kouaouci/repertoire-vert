import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyProfilePageRoutingModule } from './company-profile-routing.module';

import { CompanyProfilePageComponent } from './company-profile.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { InformationsSectionComponent } from './informations-section/informations-section.component';
import { ProductsSectionComponent } from './products-section/products-section.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { InformationEditComponent } from './information-edit/information-edit.component';
import { ProductNewComponent } from './product-new/product-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SuperTabsModule,
    CompanyProfilePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    CompanyProfilePageComponent,
    InformationsSectionComponent,
    ProductsSectionComponent,
    ProductInfoComponent,
    InformationEditComponent,
    ProductNewComponent
  ]
})
export class CompanyProfilePageModule {}
