import { TestBed, async, inject } from '@angular/core/testing';

import { FirstLogginGuard } from './first-loggin.guard';

describe('FirstLogginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstLogginGuard]
    });
  });

  it('should ...', inject([FirstLogginGuard], (guard: FirstLogginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
