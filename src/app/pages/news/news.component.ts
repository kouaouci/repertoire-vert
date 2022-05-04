import { Component, OnInit } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { SwiperOptions } from "swiper";
import { NewsService } from 'src/app/services/news/news.service';
import { Company } from 'src/app/shared/Company.model';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  // Swiper options
  config: SwiperOptions = {
    slidesPerView: 1.3,
    spaceBetween: 30,
    freeMode: true,
    scrollbar: { draggable: true },
  };

  // Latest companies & products
  companies: Company[];
  products: Product[];

  constructor(private newsService: NewsService) { }

  ngOnInit() {

    // Get latest companies and products
    this.newsService.getLatestCompaniesAndProducts('latest').then( result => {
      this.companies = result.companies;
      this.products = result.products;
    });
  }

}
