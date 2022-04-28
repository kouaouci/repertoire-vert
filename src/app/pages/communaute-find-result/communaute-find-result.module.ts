import { DateRangePipe } from './../../pipes/date-range.pipe';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunauteFindResultPageRoutingModule } from './communaute-find-result-routing.module';
import { DatePipe } from '@angular/common';
import { CommunauteFindResultPage } from './communaute-find-result.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    CommunauteFindResultPageRoutingModule,
    SharedComponentsModule
  ],
  providers:[DatePipe],
  declarations: [CommunauteFindResultPage,DateRangePipe,]
})
export class CommunauteFindResultPageModule {}
