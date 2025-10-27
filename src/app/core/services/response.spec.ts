import { TestBed } from '@angular/core/testing';

import { Response } from './response';

describe('Response', () => {
  let service: Response;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Response);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
