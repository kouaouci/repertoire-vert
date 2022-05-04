import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Subcategory } from 'src/app/shared/Subcategory.model';

@Component({
  selector: 'app-slides-categories',
  templateUrl: './slides-categories.component.html',
  styleUrls: ['./slides-categories.component.scss']
})
export class SlidesCategoriesComponent implements OnInit {

  @Input() categoryId: number;
  @Input() categoryName: string;

  pages = [];

  slideOpts = {
    slidesPerView: 1,
    centeredSlides: true,
    effect: 'cards'
  }

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategory(this.categoryId).subscribe(
      data => {
        if (data) {
          const subcategories = data[0].subcategories;
          //this.subcategories = category.subcategories;
          let i = 0;
          subcategories.forEach(subcategory => {

            // If page doesn't exist, create it
            if (!this.pages[i]) {
              this.pages[i] = { subcategories: [] };
              this.pages[i].subcategories.push(subcategory);
            }
            else {
              // If page contains less than 3 subcategories, add one more
              if (this.pages[i].subcategories.length < 3) {
                this.pages[i].subcategories.push(subcategory);
              } else {
                // Else, create one more page
                i++;
                this.pages[i] = { subcategories: [] };
                this.pages[i].subcategories.push(subcategory);
              }
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  onSwiper(swiper) {
    //console.log(swiper);
  }
  onSlideChange() {
    //console.log('slide change');
  }
}
