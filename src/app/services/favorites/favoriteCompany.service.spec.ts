/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavoriteCompanyService } from './favoriteCompany.service';

describe('Service: FavoriteCompany', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteCompanyService]
    });
  });

  it('should ...', inject([FavoriteCompanyService], (service: FavoriteCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
