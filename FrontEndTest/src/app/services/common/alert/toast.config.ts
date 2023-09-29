export type ToastType = 'success' | 'info' | 'danger' | 'warning';
export type ToastPosition = 'toast-top-center' | 'toast-bottom-center' | 'toast-top-right';

export interface ToastConfig {
  timeOut?: number;
  positionClass?: ToastPosition;
  closeButton?: boolean;
}
