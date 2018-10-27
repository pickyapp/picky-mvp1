import { TestBed } from '@angular/core/testing';

import { UqService } from './uq.service';

describe('UqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UqService = TestBed.get(UqService);
    expect(service).toBeTruthy();
  });
});
