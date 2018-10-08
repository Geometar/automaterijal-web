import { TestBed } from '@angular/core/testing';

import { RobaService } from './roba.service';

describe('RobaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RobaService = TestBed.get(RobaService);
    expect(service).toBeTruthy();
  });
});
