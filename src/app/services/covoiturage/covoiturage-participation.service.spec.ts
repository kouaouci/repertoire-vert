/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { CovoiturageParticipationService } from '../covoiturage/covoiturage-participation.service';

describe('Service: CovoiturageParticipation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CovoiturageParticipationService]
    });
  });

  it('should ...', inject([CovoiturageParticipationService], (service: CovoiturageParticipationService) => {
    expect(service).toBeTruthy();
  }));
});
