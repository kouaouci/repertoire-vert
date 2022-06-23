import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedComponentsComponent } from "./shared-components.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { SearchbarComponent } from "./searchbar/searchbar.component";
import { UserRowComponent } from "./user-row/user-row.component";
import { ToolbarWithBackComponent } from "./toolbar-with-back/toolbar-with-back.component";
import { ToggleComponent } from "./toggle/toggle.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserOfferCardComponent } from "./user-offer-card/user-offer-card.component";
import { ToolbarItemComponent } from "./toolbar/toolbar-item/toolbar-item.component";
import { KebabMenuComponent } from "./kebab-menu/kebab-menu.component";
import { ReportModalComponent } from "./report-modal/report-modal.component";
import { AddressSuggestionComponent } from "./address-suggestion/address-suggestion.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { ReviewStarsComponent } from "./review-stars/review-stars.component";
import { TranslateModule } from "@ngx-translate/core";
import { NewsCardComponent } from "./news-card/news-card.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CategoryCardComponent } from "./category-card/category-card.component";
import { SubcategoriesModalComponent } from "./subcategories-modal/subcategories-modal.component";
import { ErrorMessageComponent } from "./error-message/error-message.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    TranslateModule,
    FontAwesomeModule,
  ],
  declarations: [
    SharedComponentsComponent,
    ToolbarComponent,
    ToolbarItemComponent,
    SearchbarComponent,
    UserRowComponent,
    ToolbarWithBackComponent,
    ToggleComponent,
    UserOfferCardComponent,
    KebabMenuComponent,
    ReportModalComponent,
    AddressSuggestionComponent,
    BarChartComponent,
    ReviewStarsComponent,
    NewsCardComponent,
    CategoryCardComponent,
    SubcategoriesModalComponent,
    ErrorMessageComponent,
  ],
  exports: [
    ToolbarComponent,
    ToolbarItemComponent,
    SearchbarComponent,
    UserRowComponent,
    ToolbarWithBackComponent,
    ToggleComponent,
    UserOfferCardComponent,
    KebabMenuComponent,
    ReportModalComponent,
    AddressSuggestionComponent,
    BarChartComponent,
    ReviewStarsComponent,
    TranslateModule,
    NewsCardComponent,
    CategoryCardComponent,
    SubcategoriesModalComponent,
    ErrorMessageComponent,
  ],
})
export class SharedComponentsModule {}
