import { TestBed } from '@angular/core/testing';

import { ShopHistoryService } from './shop-history.service';

describe('ShopHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopHistoryService = TestBed.get(ShopHistoryService);
    expect(service).toBeTruthy();
  });
});
