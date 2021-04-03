import { TestBed } from '@angular/core/testing';

import { SubbannerService } from './subbanner.service';

describe('SubbannerService', () => {
  let service: SubbannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubbannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
