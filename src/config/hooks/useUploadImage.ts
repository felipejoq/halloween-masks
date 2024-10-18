import {type ChangeEvent, type FormEvent, useState} from "react";
import {checkExtensions, checkFileSize} from "@config/utils/validations.files.ts";
import {actions, isInputError} from "astro:actions";
import {sendInfoToast} from "@config/utils/toast.builders.ts";

export const useUploadImage = () => {

    const [file, setFile] = useState<File>();
    const [changeBg, setChangeBg] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            if (checkFileSize(files[0]) || checkExtensions(files[0])) {
                if (checkExtensions(files[0])) {
                    sendInfoToast('El archivo debe ser .jpg, .jpeg o .png', '🎃');
                } else {
                    sendInfoToast('El archivo no debe exceder los 5MB', '🎃');
                }
                setLoading(false);
                setFile(undefined);
                return;
            }
            setFile(files[0]);
        }

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        // show toast when file exceeds 5MB
        if (checkFileSize(file)) {
            sendInfoToast('El archivo no debe exceder los 5MB', '🎃');
            setLoading(false);
            return;
        }

        // show toast when no file extension is jpg, jpeg or png
        if (checkExtensions(file)) {
            sendInfoToast('El archivo debe ser .jpg, .jpeg o .png', '🎃');
            setLoading(false);
            return;
        }

        setLoading(true);

        // form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('change_bg', changeBg.toString());

        // send to server
        const {data, error} = await actions.uploadImages(formData);

        if (data?.result) {
            //await navigate(`/${data.result.public_id}`);
            window.location.href = `/${data.result.public_id}`;
            //setLoading(false);
        } else if (isInputError(error)) {
            setLoading(false);
            const errorMessage = error.fields?.file?.join(', ') ?? 'Unknown error';
            sendInfoToast(errorMessage, '🎃');
        } else {
            setLoading(false);
            sendInfoToast('Ha ocurrido un error inesperado', '🎃');
        }
    }

    const handleClickButton = () => {
        if (!file) {
            sendInfoToast('Debes seleccionar una imagen', '🎃');
        }
    }

    return {
        file,
        changeBg,
        loading,
        setFile,
        setLoading,
        setChangeBg,
        handleFile,
        handleSubmit,
        handleClickButton,
    }

}