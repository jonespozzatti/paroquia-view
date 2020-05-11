import { TestBed } from '@angular/core/testing';

import { PessoapastoralService } from './pessoapastoral.service';

describe('PessoapastoralService', () => {
  let service: PessoapastoralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoapastoralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
