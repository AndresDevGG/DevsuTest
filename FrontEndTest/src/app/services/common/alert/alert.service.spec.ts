import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AlertService } from './alert.service';
import { TestBed } from '@angular/core/testing';

describe('AlertService', () => {
  let service: AlertService;
  let toastService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule],
      providers: [AlertService, ToastrService]
    });
    toastService = TestBed.inject(ToastrService);
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(toastService).toBeTruthy();
  });
});
