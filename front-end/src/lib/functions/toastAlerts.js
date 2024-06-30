import {toast} from "react-toastify";

export function alertSuccess(message, position = "top-right", autoClose = 2000) {
  toast.success(message, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export function alertError(message, position = "top-right", autoClose = 2000) {
  toast.error(message, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
