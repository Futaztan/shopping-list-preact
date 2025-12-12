import { useState } from 'preact/hooks';
import { ToastMessage, ToastType } from '../types/Toast';
import { ToastContainer  as UI_ToastContainer } from '../components/footer/ToastContainer';

export function useToast() {

  const [toast, setToast] = useState<ToastMessage | null>(null);

  function removeToast() {
    setToast(null);   
  }

  function showToast(message: string, type: ToastType = 'info') {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null)
    }, 3000);
  }

  function ConnectedToastContainer() {
    return (
      <UI_ToastContainer
        toast={toast}
        removeToast={removeToast}
      />
    );
  }

  return { showToast, ToastContainer: ConnectedToastContainer };
}