import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/Company.model';

@Component({
  selector: 'app-subcategory-company',
  templateUrl: './subcategory-company.component.html',
  styleUrls: ['./subcategory-company.component.scss']
})
export class SubcategoryCompanyComponent implements OnInit {

  @Input() company: Company;
  showDetails: boolean = false;

  image = '';
  defaultImage = '../../../../../assets/imgs/no_product.jpg';

  constructor() { }

  ngOnInit() {
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  getCategoryImage(name: string) {
    return "https://repertoirevert.org/images/Icones_Categories/" + name + "/" + name + "_noir.png";
  }

  getSubcategoryImage(catName: string, subcatName: string) {
    return "https://repertoirevert.org/images/Icones_Categories/" + catName + "/Icônes sous-catégories/" + subcatName + ".png";
  }

  handleImageError(img) {
    img.src = this.defaultImage;
  }
}
