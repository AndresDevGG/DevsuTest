import { AlertService } from '../alert/alert.service';
import { Config } from '../../http/http.config';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastType } from '../alert/toast.config';

@Injectable({
  providedIn: 'root'
})
export class ResolveService {

  constructor(
    private _alert: AlertService,
    private _router: Router,

  ) { }

  public resolve<T>(response: Config<T>, navigate?: string, showSuccess: boolean = false, message?: string): void {

    const typeToast: ToastType = response.ok ? 'success' : 'danger';
    if (response.ok && showSuccess) {
      this._alert.show(typeToast, (message as string));
    }
    if (navigate)
      this._router.navigate([navigate]);

  }

}
