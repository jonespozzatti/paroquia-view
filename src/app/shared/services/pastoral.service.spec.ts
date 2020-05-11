import { TestBed } from '@angular/core/testing';

import { PastoralService } from './pastoral.service';

describe('PastoralService', () => {
  let service: PastoralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastoralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
