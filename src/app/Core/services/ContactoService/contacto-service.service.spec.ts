import { TestBed } from '@angular/core/testing';

import { ContactoServiceService } from './contacto-service.service';

describe('ContactoServiceService', () => {
  let service: ContactoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
