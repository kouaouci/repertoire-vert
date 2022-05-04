import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { CovDetailsPageRoutingModule } from './cov-details-routing.module';

import { CovDetailsPage } from './cov-details.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { TravelInfoComponent } from './travel-info/travel-info.component';
import { CovDetailsTravelComponent } from './cov-details-travel/cov-details-travel.component';
import { CovDetailsInvitesComponent } from './cov-details-invites/cov-details-invites.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { CovDetailsReservationsComponent } from './cov-details-reservations/cov-details-reservations.component';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    IonicModule,
    NgxPaginationModule,
    CovDetailsPageRoutingModule,
    SharedComponentsModule,
    SuperTabsModule
  ],
  providers: [
    NgxPaginationModule,
  ],
  declarations: [
    CovDetailsPage,
    TravelInfoComponent,
    CovDetailsTravelComponent,
    CovDetailsInvitesComponent,
    CovDetailsReservationsComponent
  ]
})
export class CovDetailsPageModule {}
