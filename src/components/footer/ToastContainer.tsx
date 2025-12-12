import { ToastMessage } from "../../types/Toast";

type ToastContainerProps = {
  toast: ToastMessage | null;
  removeToast: () => void;
}
/**
 * Ez a toast üzenet, amit feldob ha valami sikertelen/sikeres volt az oldal jobb oldalán alul
 *
 * @param toast - ToastMessage típusu, amit tartalmazza az üzenet és hogy milyen típusú az üzenet (success,error,info)
 *  @param removeToast - ha rákattitunk a toast üzenetre akkor ezzel törlődik
 * @returns HTML kód a toast-nak
 */
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