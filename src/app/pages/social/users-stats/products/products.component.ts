import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Cart } from 'src/app/shared/Cart.model';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges {

  @Input() carts: Cart[];

  // List of 5 most recent products bought by user
  products: Product[];

  // Limit of products to show
  limit: number = 1;

  constructor(private helper: HelperService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.carts) {
      this.getProducts();
    }
  }

  getProducts() {
    // Initialize products list
    this.products = [];

    // For each user cart
    this.carts.forEach(c => {

      // Get only confirmed orders
      if (c.status === 'confirmed') {
        // For each cartline of cart
        c.cartlines.forEach(l => {

          // Add 5 latest products bought by user
          if (this.products.length < 5) {
            let product = l.produit as Product;
            this.products.push(product);
          }
        });
      }
    });
  }

  updateLimit() {
    this.limit === 1 ? this.limit = 5 : this.limit = 1;
  }

  getImage(filename: string) {
    return this.helper.getServerImage(filename);
  }

  handleImageError(img) {
    img.src = this.helper.defaultImage;
  }
}
