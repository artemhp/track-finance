import { TestBed, inject } from '@angular/core/testing';

import { RecordsListService } from './records-list.service';

describe('RecordsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordsListService]
    });
  });

  it('should be created', inject([RecordsListService], (service: RecordsListService) => {
    expect(service).toBeTruthy();
  }));
});
