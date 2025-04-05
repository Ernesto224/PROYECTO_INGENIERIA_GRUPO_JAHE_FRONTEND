import { TestBed } from '@angular/core/testing';

import { ComoLlegarServiceService } from './como-llegar-service.service';

describe('ComoLlegarServiceService', () => {
  let service: ComoLlegarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComoLlegarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
