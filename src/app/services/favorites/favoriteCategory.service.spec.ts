/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavoriteCategoryService } from './favoriteCategory.service';

describe('Service: FavoriteCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteCategoryService]
    });
  });

  it('should ...', inject([FavoriteCategoryService], (service: FavoriteCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
