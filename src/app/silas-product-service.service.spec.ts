import { TestBed } from '@angular/core/testing';

import { SilasProductServiceService } from './silas-product-service.service';

describe('SilasProductServiceService', () => {
  let service: SilasProductServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilasProductServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
