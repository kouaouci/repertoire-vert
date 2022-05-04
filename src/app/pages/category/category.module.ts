import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { SlidesCategoriesComponent } from './slides-categories/slides-categories/slides-categories.component';
import { CardSousCategorieComponent } from './card-sous-categorie/card-sous-categorie/card-sous-categorie.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    CategoryPage,
    SlidesCategoriesComponent,
    CardSousCategorieComponent
  ],
})
export class CategoryPageModule {}
