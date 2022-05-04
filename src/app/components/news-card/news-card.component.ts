import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faCampground } from '@fortawesome/free-solid-svg-icons';
import { DateService } from 'src/app/services/date/date.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Company } from 'src/app/shared/Company.model';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnChanges {

  @Input() company: Company;
  @Input() product: Product;
  @Input() size: string;

  // Font awesome icon
  faCampground = faCampground;

  // Category image, if not found
  imgUrl = "https://repertoirevert.org/css/img/category/";

  // Date
  date:any;

  constructor(
    private dateService: DateService, 
    private helper: HelperService,
    private productService: ProductService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.company) {

      // Get javascript datetime from php date format
      let inscriptionDate = this.dateService.getDateFromPhpFormat(this.company.inscriptiondate);

      // Get date only from datetime
      this.date = this.dateService.getDate(inscriptionDate);

      // Get category image
      if (this.company.categories[0]) {
        this.imgUrl += this.company.categories[0].name + '.jpg';
      }
    }

    if (this.product) {
      // Get javascript datetime from php date format
      let creationDate = this.dateService.getDateFromPhpFormat(this.product.creationdate);

      // Get date only from datetime
      this.date = this.dateService.getDate(creationDate);

      // Get product image
      this.imgUrl = this.productService.IMG_URL + this.product.image;
    }
  }

  handleImageError(img) {
    img.src = this.helper.defaultImage;
  }
}
