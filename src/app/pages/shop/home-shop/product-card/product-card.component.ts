import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { FavoriteService } from 'src/app/services/favorites/favorite.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;

  productId: number;

  userId = parseInt(localStorage.getItem('repVertId'));

  image = '';
  defaultImage = '../../../../../assets/imgs/no_product.jpg';

  constructor(
    private alertService: AlertService,
    private favoriteService: FavoriteService,
    private productService: ProductService) { }

  ngOnInit() {

    if (this.product) {
      this.productId = this.product.id;      
    }
    this.getImage();
  }

  getImage() {
    if (this.product.image !== '') {
      this.image = this.productService.IMG_URL + this.product.image;
      //this.image = this.product.image;
    } else {
      this.image = this.defaultImage;
    }
  }

  handleImageError(img) {
    img.src = this.defaultImage;
  }

  addOrRemoveFavorite() { 
    
    if (this.product.isFavorite) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  }

  addToFavorites() {
    this.favoriteService.addProductToFavorites(this.productId, this.userId).subscribe(
      response => {
        this.product.isFavorite = true;
      },
      error => {
        console.log();
      }
    )
  }

  removeFromFavorites() {
    this.favoriteService.removeFromFavorites(this.productId, this.userId).subscribe(
      response => {
        if (response.code === 404) {
          this.alertService.presentAlert("error", "errorOccurred");
        } else {
          this.product.isFavorite = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
