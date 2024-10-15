import React, {type ChangeEvent, type FormEvent, useState} from "react";
import {actions, isInputError} from "astro:actions";
import {Loader} from "../shared/Loader.tsx";
import {Toaster, toast} from "sonner";
import {navigate} from "astro:transitions/client";

export const UploadImage: React.FC = () => {

    const [file, setFile] = useState<File>();
    const [changeBg, setChangeBg] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            return;
        }

        // show toast when file exceds 2MB
        if (file.size > 2 * 1024 * 1024) {
            toast.info('El archivo no debe exceder los 2MB', {
                position: 'top-center',
                icon: '🎃'
            });
            setLoading(false);
            return;
        }

        // show toast when no file extension is jpg, jpeg or png
        const allowedExtensions = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!allowedExtensions.includes(file.type)) {
            toast.info('El archivo debe ser .jpg, .jpeg o .png', {
                position: 'top-center',
                icon: '🎃'
            });
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
            setLoading(false);
            await navigate(`/${data.result.public_id}`);
            // window.location.href = `/${data.result.public_id}`;
        } else if (isInputError(error)) {
            setLoading(false);
            const errorMessage = error.fields?.file?.join(', ') ?? 'Unknown error';
            toast.info(`${errorMessage}`, {
                position: 'top-center',
                icon: '🎃'
            });
        } else {
            setLoading(false);
            toast.info('Ha ocurrido un error inesperado', {
                position: 'top-center',
                icon: '🎃'
            });
        }
    }

    const handleClickButton = () => {
        if (!file) {
            toast.info('Debes seleccionar una imagen', {
                position: 'top-center',
                icon: '🎃'
            });
        }
    }

    return (
        <div className='px-4'>
            {
                loading ? (<Loader/>) : (
                    <form onSubmit={handleSubmit}
                          className="flex flex-col gap-5 items-center justify-center content-center w-full">

                        <input
                            id='file'
                            type="file"
                            name="file"
                            onChange={handleFile}
                            className='text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100'
                        />
                        <label htmlFor='file'>
                            Solo archivos .jpg, jpeg y png de máximo 2MB.
                        </label>
                        <label htmlFor='change_bg'
                               className='text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-center gap-2'>
                            <div className='flex gap-5 text-orange-500 font-semibold text-2xl'>
                                Marca para agregar un fondo "Terrorífico"</div>
                                <span className='hidden sm:block text-[30px]'>😏👉</span>
                            <div className='flex justify-center'>
                                <input
                                    checked={changeBg}
                                    onChange={() => setChangeBg(!changeBg)}
                                    type='checkbox'
                                    name='change_bg'
                                    id='change_bg'
                                    className='mr-2 h-5 w-5 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2'
                                /> <span className='block sm:hidden text-[30px]'>👈😏</span>
                            </div>
                        </label>

                        <button
                            onClick={handleClickButton}
                            className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Subir y probar
                        </button>
                    </form>
                )
            }
            {
                file && (
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='my-3 text-3xl'>📸 Tu foto</h2>
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="w-4/5 sm:w-1/2 xl:w-1/4"
                        />
                    </div>
                )
            }
            <Toaster/>
        </div>
    )
}