import { TestBed } from '@angular/core/testing';

import { AboutInfoService } from './about-info.service';

describe('AboutInfoService', () => {
  let service: AboutInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
