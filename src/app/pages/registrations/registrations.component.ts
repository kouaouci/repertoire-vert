import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news/news.service';
import { Category } from 'src/app/shared/category.model';
import { Company } from 'src/app/shared/Company.model';
import { Product } from 'src/app/shared/Product.model';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {

  // Companies or products
  type: string;

  // Registration and added labels
  registrationLabel: string;
  addedLabel: string;

  // Companies and products
  companies: Company[];
  products: Product[];

  // Categories
  companyCategories: Category[];
  productCategories: Category[];

  // Swiper options
  config: SwiperOptions = {
    slidesPerView: 1.3,
    spaceBetween: 30,
    freeMode: true,
    scrollbar: { draggable: true },
  };

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params =>
      this.type = params['type']
    );

    // Set labels to this week
    this.registrationLabel = 'news.registeredWeek';
    this.addedLabel = 'news.addedWeek';

    // Get latest companies and products
    this.newsService.getLatestCompaniesAndProducts('week').then( result => {
      this.companies = result.companies;
      this.products = result.products;

      // Update categories
      this.getCompanyCategories();
      this.getProductCategories();
    });
  }

  togglePage() {
    if (this.type === 'companies') {
      this.type = 'products';
    } else {
      this.type = 'companies';
    }
  }

  handleChange(event) {
    let filter = event.detail.value;

    // Update labels
    this.updateLabel(filter);

    // Update companies and products based on selected filter
    this.newsService.getLatestCompaniesAndProducts(filter).then( result => {
      this.companies = result.companies;
      this.products = result.products;

      // Update categories
      this.getCompanyCategories();
      this.getProductCategories();
    })
  }

  updateLabel(filter: string) {
    switch(filter) {
      case 'today': {
        this.registrationLabel = 'news.registeredToday';
        this.addedLabel = 'news.addedToday';
        break;
      }
      case 'week': {
        this.registrationLabel = 'news.registeredWeek';
        this.addedLabel = 'news.addedWeek';
        break;
      }
      case 'month': {
        this.registrationLabel = 'news.registeredMonth';
        this.addedLabel = 'news.addedMonth';
        break;
      }
      case 'threeMonths': {
        this.registrationLabel = 'news.registeredThreeMonths';
        this.addedLabel = 'news.addedThreeMonths';
        break;
      }
      case 'sixMonths': {
        this.registrationLabel = 'news.registeredSixMonths';
        this.addedLabel = 'news.addedSixMonths';
        break;
      }
    }
  }

  getCompanyCategories() {

    // Initialize categories list
    this.companyCategories = [];

    this.companies.forEach( company => {

      // If company has categories
      if (company.categories) {
        // Add company categories to list
        company.categories.forEach( companyCategory => {

          // Find category index, if already in list
          let index = this.companyCategories.findIndex( category => {
            return category.id === companyCategory.id;
          });

          // Add category if not in list yet
          if (index === -1) {
            this.companyCategories.push(companyCategory);
          }
        });
      }
    });
  }

  getProductCategories() {

    // Initialize categories list
    this.productCategories = [];

    this.products.forEach( product => {

      // Get all subcategories
      product.subcategories.forEach( productSubcategory => {

        // Get all categories of subcategory
        productSubcategory.categories.forEach( category => {

          // Find index of category, if already in list
          let index = this.productCategories.findIndex( c => {
            return c.id === category.id;
          });

          // Add category if not in list yet
          if (index === -1) {
            this.productCategories.push(category);
          }
        });
      })
    });
  }
}
