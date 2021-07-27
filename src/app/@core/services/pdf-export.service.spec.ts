import { TestBed } from '@angular/core/testing';

import { PdfExportService } from './pdf-export.service';

describe('PdfExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfExportService = TestBed.get(PdfExportService);
    expect(service).toBeTruthy();
  });
});
