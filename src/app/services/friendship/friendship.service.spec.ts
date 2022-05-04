/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { FriendshipService } from './friendship.service';

describe('Service: Friendship', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendshipService]
    });
  });

  it('should ...', inject([FriendshipService], (service: FriendshipService) => {
    expect(service).toBeTruthy();
  }));
});
