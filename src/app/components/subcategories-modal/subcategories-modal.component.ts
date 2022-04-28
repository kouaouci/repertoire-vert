import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/shared/category.model';
import { Subcategory } from 'src/app/shared/Subcategory.model';

@Component({
  selector: 'app-subcategories-modal',
  templateUrl: './subcategories-modal.component.html',
  styleUrls: ['./subcategories-modal.component.scss']
})
export class SubcategoriesModalComponent implements OnInit {

  // Close modal function
  @Input() close: Function;

  // Categories and subcategories
  @Input() categories: Category[];
  @Input() productSubcategories: Subcategory[];
  showCategorySubcategories: { [categoryId: number]: boolean };

  // Product form for editing
  subcategoriesForm = new FormGroup({
    subcategories: new FormControl('')
  });

  // Selected subcategories
  selectedSubcategories: number[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    
    // Close all category drawers first
    this.showCategorySubcategories = [];
    if (this.categories) {
      this.categories.forEach(c => {
        this.showCategorySubcategories[c.id] = false;
      })
    }

    // Add all product subcategories to selected
    if (this.productSubcategories) {
      this.productSubcategories.forEach( s => {
        this.selectedSubcategories.push(s.id);
      });
    }
  }

  toggleSubcategories(id) {
    this.showCategorySubcategories[id] = !this.showCategorySubcategories[id];
  }

  addOrRemove(id) {
    let index = this.selectedSubcategories.findIndex(s => {
      return s === id;
    });

    if (index !== -1) {
      this.selectedSubcategories.splice(index, 1);
    } else {
      this.selectedSubcategories.push(id);
    }
  }

  dismiss() {
    this.modalController.dismiss(this.selectedSubcategories);
  }
}
