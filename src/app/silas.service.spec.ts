import { TestBed } from '@angular/core/testing';

import { SilasService } from './silas.service';

describe('SilasService', () => {
  let service: SilasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
