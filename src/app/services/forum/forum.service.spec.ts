/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ForumService } from './forum.service';

describe('Service: Forum', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForumService]
    });
  });

  it('should ...', inject([ForumService], (service: ForumService) => {
    expect(service).toBeTruthy();
  }));
});
