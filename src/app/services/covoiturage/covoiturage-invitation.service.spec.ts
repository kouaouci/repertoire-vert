/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { CovoiturageInvitationService } from './covoiturage-invitation.service';

describe('Service: CovoiturageInvitation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CovoiturageInvitationService]
    });
  });

  it('should ...', inject([CovoiturageInvitationService], (service: CovoiturageInvitationService) => {
    expect(service).toBeTruthy();
  }));
});
