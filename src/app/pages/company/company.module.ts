import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyPageRoutingModule } from './company-routing.module';

import { CompanyPage } from './company.page';
//import { TabPageModule } from '../tab/tab.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import {ErrorMessageComponent} from 'src/app/components/error-message/error-message.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CompanyPageRoutingModule,
    //TabPageModule,
    SharedComponentsModule
  ],
  declarations: [
    CompanyPage,
    ErrorMessageComponent,
  ]
})
export class CompanyPageModule {}
