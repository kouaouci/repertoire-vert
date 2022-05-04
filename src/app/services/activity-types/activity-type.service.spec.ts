/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ActivityTypeService } from './activity-type.service';

describe('Service: ActivityType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityTypeService]
    });
  });

  it('should ...', inject([ActivityTypeService], (service: ActivityTypeService) => {
    expect(service).toBeTruthy();
  }));
});
