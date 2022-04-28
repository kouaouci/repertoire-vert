import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Company } from 'src/app/shared/Company.model';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-favorite-row',
  templateUrl: './favorite-row.component.html',
  styleUrls: ['./favorite-row.component.scss']
})
export class FavoriteRowComponent implements OnChanges {

  @Input() product: Product;
  @Input() company: Company;

  id: number;
  name: string;
  image: string;
  defaultImage = '../../../../../assets/imgs/no_product.jpg';

  constructor(private productService: ProductService) { }

  ngOnChanges(changes: SimpleChanges): void {
      if (this.product) {
        this.id = this.product.id;
        this.name = this.product.name;
        this.image = this.getImage(this.product.image);
      }
      
      if (this.company) {
        this.id = this.company.id;
        this.name = this.company.name;
        this.image = this.getImage(this.company.image);
      }
  }

  getImage(file: string) {
    if (file !== '' && file !== null) {
      //this.image = this.product.image;
      return this.productService.IMG_URL + file;
    } else {
      return this.defaultImage;
    }
  }
}
