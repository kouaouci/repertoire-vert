import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormOptionsPageRoutingModule } from './form-options-routing.module';

import { FormOptionsPage } from './form-options.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { SecondPageComponent } from './second-page/second-page/second-page.component';
import { FirstPageComponent } from './first-page/first-page/first-page.component';
import { FormChoiceComponent } from './form-choice/form-choice/form-choice.component';
import { ThirdPageComponent } from './third-page/third-page/third-page.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormOptionsPageRoutingModule,
    SharedComponentsModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    FormOptionsPage,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    FormChoiceComponent
  ]
})
export class FormOptionsPageModule {}
