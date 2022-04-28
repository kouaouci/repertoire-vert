import { Component, Input, OnInit } from '@angular/core';
import { Subcategory } from 'src/app/shared/Subcategory.model';

@Component({
  selector: 'app-card-sous-categorie',
  templateUrl: './card-sous-categorie.component.html',
  styleUrls: ['./card-sous-categorie.component.scss']
})
export class CardSousCategorieComponent implements OnInit {

  @Input() subcategory: Subcategory;
  @Input() categoryId: number;
  @Input() categoryName: string;

  imageUrl: string;
  truncatedName: string;
  defaultImage: '../../../../../assets/imgs/no_product.jpg';

  constructor() { }

  ngOnInit() {

    this.imageUrl = "../../../../../assets/imgs/categories/"+ this.categoryName +"/"+ this.subcategory.name + "@2x.png";
    this.truncateName(50); //38 is max length of the string
  }

  truncateName(length: number) {
    if (this.subcategory.name.length > length) {
      this.truncatedName = this.subcategory.name.substr(0, length) + '...';
    }
    else {
      this.truncatedName = this.subcategory.name;
    }
  }

  handleImageError(img) {
    img.src = this.defaultImage;
  }
}
