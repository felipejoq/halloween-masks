import React, {type ChangeEvent, type FormEvent, useRef, useState} from "react";
import {actions} from "astro:actions";
import type {ResponseUpload} from "./responseUpload.ts";

export const UploadImage: React.FC = () => {

    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<ResponseUpload>();
    const [error, setError] = useState<any>();

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

        setLoading(true);

        // form data
        const formData = new FormData();
        formData.append('file', file);

        // send to server
        const {data, error} = await actions.uploadImages(formData);

        if (data || error) {
            setLoading(false);
            setError(error);
        }
        setResponse(data?.result);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
                <input
                    type="file"
                    name="file"
                    onChange={handleFile}
                />
                <button
                    className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Subir y probar
                </button>
            </form>
            {
                file && (
                    <>
                        <h2 className='my-3 text-3xl'>📸 Tu foto</h2>
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="w-1/5"
                        />
                    </>
                )
            }

            {
                loading && <p>Loading...</p>
            }

            {
                response && (
                    <>
                        <h2 className='text-3xl'>😱 Así te verías 😧</h2>
                        {
                            response.face_masks.map((face, index) => (
                                <img
                                    key={index}
                                    src={face}
                                    alt="Face"
                                    className="w-1/6"
                                />
                            ))
                        }
                    </>
                )
            }

            {
                error && <p>{JSON.stringify(error)}</p>
            }
        </>
    )
}