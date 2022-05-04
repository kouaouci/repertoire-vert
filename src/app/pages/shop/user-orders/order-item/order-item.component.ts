import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Cartline } from 'src/app/shared/Cartline.model';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() cartline: Cartline;

  product: Product;

  image: string;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.cartline && !this.image) {
      this.product = this.cartline.produit as Product;
      this.getProductImage(this.product.image);
    }
  }

  getProductImage(image: string) {

    if (image !== '' && image !== null) {
      this.image = "https://repertoirevert.org/uploads/products/" + image;
    } else {
      return this.helperService.defaultImage;
    }
  }
}
