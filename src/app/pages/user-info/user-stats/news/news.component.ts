import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NewsService } from 'src/app/services/news/news.service';
import { Company } from 'src/app/shared/Company.model';
import { Product } from 'src/app/shared/Product.model';

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Output() touchStartEvent = new EventEmitter<null>();
  @Output() touchEndEvent = new EventEmitter<null>();

  // New companies and products
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

  touchStart() {
    this.touchStartEvent.emit();
  }

  touchEnd() {
    this.touchEndEvent.emit();
  }
}
