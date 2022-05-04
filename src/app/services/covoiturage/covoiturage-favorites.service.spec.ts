/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { CovoiturageFavoritesService } from './covoiturage-favorites.service';

describe('Service: CovoiturageFavorites', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CovoiturageFavoritesService]
    });
  });

  it('should ...', inject([CovoiturageFavoritesService], (service: CovoiturageFavoritesService) => {
    expect(service).toBeTruthy();
  }));
});
