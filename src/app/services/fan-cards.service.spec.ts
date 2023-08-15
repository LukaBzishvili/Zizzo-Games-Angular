import { TestBed } from '@angular/core/testing';

import { FanCardsService } from './fan-cards.service';

describe('FanCardsService', () => {
  let service: FanCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FanCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
