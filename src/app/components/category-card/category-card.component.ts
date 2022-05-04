import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit, OnChanges {

  @Input() name: string;

  // Image url
  imgUrl: string;

  constructor(private helper: HelperService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (this.name) {
        this.imgUrl = "https://repertoirevert.org/css/img/category/" + this.name + ".jpg";
      }
  }

  handleImageError(img) {
    img.src = this.helper.defaultImage;
  }
}
