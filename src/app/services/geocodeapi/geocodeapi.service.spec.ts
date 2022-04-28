/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { GeocodeapiService } from './geocodeapi.service';

describe('Service: Geocodeapi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeocodeapiService]
    });
  });

  it('should ...', inject([GeocodeapiService], (service: GeocodeapiService) => {
    expect(service).toBeTruthy();
  }));
});
