import { TestBed } from '@angular/core/testing';

import { HomeCommonService } from './home-common.service';

describe('HomeCommonService', () => {
  let service: HomeCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
