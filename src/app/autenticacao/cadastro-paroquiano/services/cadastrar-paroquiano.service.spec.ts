import { TestBed } from '@angular/core/testing';

import { CadastrarParoquianoService } from './cadastrar-paroquiano.service';

describe('CadastrarParoquianoService', () => {
  let service: CadastrarParoquianoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrarParoquianoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
