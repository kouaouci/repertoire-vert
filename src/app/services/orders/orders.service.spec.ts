/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { OrdersService } from './orders.service';

describe('Service: Orders', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersService]
    });
  });

  it('should ...', inject([OrdersService], (service: OrdersService) => {
    expect(service).toBeTruthy();
  }));
});
