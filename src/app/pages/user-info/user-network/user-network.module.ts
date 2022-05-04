import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserNetworkPageRoutingModule } from './user-network-routing.module';

import { UserNetworkPageComponent } from './user-network.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserNetworkPageRoutingModule,
    Ng2SearchPipeModule,
    SharedComponentsModule
  ],
  declarations: [UserNetworkPageComponent],
  exports: [UserNetworkPageComponent]
})
export class UserNetworkPageModule {}
