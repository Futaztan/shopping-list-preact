import { ToastMessage } from "../types/Toast";

type ToastContainerProps = {
    toast: ToastMessage | null;
    removeToast: () => void;
}

export function ToastContainer({ toast, removeToast }: ToastContainerProps) {
 
    if (!toast) return null;

 
    return (
      <div class="toast-container">
    
         <div class={`toast ${toast.type}`}>
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast()}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: '10px' }}
            >
              ✕
            </button>
         </div>
      </div>
    );
}