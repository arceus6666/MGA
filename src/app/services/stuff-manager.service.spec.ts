import { TestBed } from '@angular/core/testing';

import { StuffManagerService } from './stuff-manager.service';

describe('StuffManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StuffManagerService = TestBed.get(StuffManagerService);
    expect(service).toBeTruthy();
  });
});
