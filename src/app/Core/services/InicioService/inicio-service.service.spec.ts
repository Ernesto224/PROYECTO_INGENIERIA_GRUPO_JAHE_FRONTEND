import { TestBed } from '@angular/core/testing';

import { InicioServiceService } from './inicio-service.service';

describe('InicioServiceService', () => {
  let service: InicioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InicioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
