import { useRef } from "react";
import Swal from "../../assets/js/sweetalert";
import Sweet from "../../model/interfaces/Sweet.mode.interface";


const useSweet = (): Sweet => {

    const alert = useRef(Swal());

    const openInformation = (title: string, message: string) => {
        alert.current({
            title: title,
            text: message,
            type: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    };

    const openSuccess = (title: string, message: string, callback = function () { }) => {
        const result = alert.current({
            title: title,
            text: message,
            type: "success",
            showConfirmButton: true,
            allowOutsideClick: false,
        });

        if (result instanceof Promise) {
            result.then(() => {
                callback();
            });
        }
    };

    const openWarning = (title: string, message: string, callback = function () { }) => {
        const result = alert.current({
            title: title,
            text: message,
            type: "warning",
            showConfirmButton: true,
            allowOutsideClick: false,
        });

        if (result instanceof Promise) {
            result.then(() => {
                callback();
            });
        }
    };

    const openError = (title: string, message: string) => {
        alert.current({
            title: title,
            text: message,
            type: "error",
            showConfirmButton: true,
            allowOutsideClick: false,
        });
    };

    const openDialog = (title: string, message: string, callback: (value: boolean) => void) => {
        const result = alert.current({
            title: title,
            text: message,
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
            allowOutsideClick: false,
        });

        if (result instanceof Promise) {
            result.then((isConfirm: any) => {
                if (isConfirm.value === undefined) {
                    callback(false);
                    return;
                }
                if (isConfirm.value) {
                    callback(true);
                } else {
                    callback(false);
                }
            });
        }
    }

    return {
        alert: alert.current,
        openInformation,
        openSuccess,
        openWarning,
        openError,
        openDialog
    };
}

export default useSweet;