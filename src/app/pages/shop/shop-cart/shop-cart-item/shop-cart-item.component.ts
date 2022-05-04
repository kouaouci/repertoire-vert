import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Cartline } from 'src/app/shared/Cartline.model';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-shop-cart-item',
  templateUrl: './shop-cart-item.component.html',
  styleUrls: ['./shop-cart-item.component.scss']
})
export class ShopCartItemComponent implements OnInit {

  @Output() addEvent = new EventEmitter<number>();
  @Output() removeEvent = new EventEmitter<number>();
  @Output() removeAllEvent = new EventEmitter<number>();

  @Input() product: Product;
  @Input() quantity: number;

  image = '';
  defaultImage = '../../../../../assets/imgs/no_product.jpg';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    if (this.product) {
      this.getImage();
    }
  }

  getImage() {
    let productImage = this.product.image;
    if (productImage !== '' && productImage !== null) {
      this.image = this.productService.IMG_URL + productImage;
    } else {
      this.image = this.defaultImage;
    }
  }

  handleImageError(img) {
    img.src = this.defaultImage;
  }

  add() {
    this.addEvent.emit(this.product.id);
  }

  remove() {
    this.removeEvent.emit(this.product.id);
  }

  removeAll() {
    this.removeAllEvent.emit(this.product.id);
  }

}
