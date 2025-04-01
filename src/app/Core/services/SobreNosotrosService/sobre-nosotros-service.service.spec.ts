import { TestBed } from '@angular/core/testing';

import { SobreNosotrosServiceService } from './sobre-nosotros-service.service';

describe('SobreNosotrosServiceService', () => {
  let service: SobreNosotrosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SobreNosotrosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
