export type ToastMessage = {
  message: string;
  type: ToastType;
};
export type ToastType = 'success' | 'error' | 'info';