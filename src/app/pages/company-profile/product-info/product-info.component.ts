import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Merchandise } from 'src/app/shared/Merchandise.model';
import { Product } from 'src/app/shared/Product.model';
import { Service } from 'src/app/shared/Service.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  @Input() product: Product;

  merchandise: Merchandise;
  service: Service;

  image = '';
  defaultImage = '../../../../assets/imgs/no_product.jpg';

  constructor(
    private productServcie: ProductService
  ) { }

  ngOnInit() {

    // Set product type (merchandise or service)
    if (this.product.discr === 'marchandise' || this.product.type === 'marchandise') {
      this.merchandise = this.product;
      this.product.discr = 'marchandise';
    } else {
      this.service = this.product;
    }

    this.getImage();
  }

  getImage() {
    if (this.product.image !== '' && this.product.image !== null) {
      this.image = this.productServcie.IMG_URL + this.product.image;
    } else {
      this.image = this.defaultImage;
    }
  }

  handleImageError(img) {
    img.src = this.defaultImage;
  }
}
