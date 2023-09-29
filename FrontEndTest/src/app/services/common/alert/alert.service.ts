import { ToastConfig, ToastType } from './toast.config';

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _message: string = '';
  private _title: string = '';
  private _toastConfig: ToastConfig = null;

  constructor(private _toastr: ToastrService) { }

  public show(type: ToastType, message: string, title?: string, toastConfig?: ToastConfig): void {

    this._message = message;
    this._title = title || '';
    this._toastConfig = toastConfig ?? null;

    if(type === 'success') {
      this.success();
    } else if(type === 'danger') {
      this.error();
    }

  }

  public success(message?: string | string[], title?: string, toastConfig?: ToastConfig): void {
    const type = typeof(message ?? this._message);

    if (type === 'string') {
      this._toastr.success((message as string) ?? this._message, title ?? this._title,
        toastConfig ?? {
          positionClass: this._toastConfig?.positionClass ?? 'toast-bottom-center',
          timeOut: this._toastConfig?.timeOut ?? 3000,
          closeButton: true
        });
    } else if(type === 'object'){
      (message as string[]).forEach(itemMessage => {
        this._toastr.success(itemMessage ?? this._message, title ?? this._title,
        toastConfig ?? {
          positionClass: this._toastConfig?.positionClass ?? 'toast-bottom-center',
          timeOut: this._toastConfig?.timeOut ?? 3000,
          closeButton: true
        });
      });
    }
  }

  public error(message?: string | string[], title?: string, toastConfig?: ToastConfig): void {
    const type = typeof(message ?? this._message);
    if (type === 'string') {
      this._toastr.error((message as string) ?? this._message, title ?? this._title,
        toastConfig ?? {
          positionClass: this._toastConfig?.positionClass ?? 'toast-bottom-center',
          timeOut: this._toastConfig?.timeOut ?? 3000,
          closeButton: true
        });
    } else if(type === 'object') {
      (message as string[]).forEach(itemMessage => {
        this._toastr.error(itemMessage ?? this._message, title ?? this._title,
        toastConfig ?? {
          positionClass: this._toastConfig?.positionClass ?? 'toast-bottom-center',
          timeOut: this._toastConfig?.timeOut ?? 3000,
          closeButton: true
        });
      });
    }

  }
}
