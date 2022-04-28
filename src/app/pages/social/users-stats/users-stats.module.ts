import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStatsComponent } from './users-stats.component';
import { UsersStatsPageRoutingModule } from './users-stats-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { Co2BalanceComponent } from './co2-balance/co2-balance.component';
import { BarChartMonthComponent } from './co2-balance/bar-chart-month/bar-chart-month.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ActivitiesComponent } from './activities/activities.component';
import { ProductsComponent } from './products/products.component';
import { ConseilVertComponent } from './conseil-vert/conseil-vert.component';
import { PromoCodesComponent } from './promo-codes/promo-codes.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedComponentsModule,
    UsersStatsPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [
    UsersStatsComponent,
    Co2BalanceComponent,
    BarChartMonthComponent,
    ActivitiesComponent,
    ProductsComponent,
    ConseilVertComponent,
    PromoCodesComponent
  ]
})
export class UsersStatsModule { }
