import {toast} from "sonner";

export const sendInfoToast = (message: string, icon: string = '🎃') => {
    toast.info(message, {
        position: 'top-center',
        icon: icon
    });
}