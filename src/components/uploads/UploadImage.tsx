import React from "react";
import {Loader} from "@components/shared/Loader";
import {masks} from "@config/utils/masks.array";
import {allowedExtensions} from "@config/utils/validations.files.ts";
import {useUploadImage} from "@config/hooks/useUploadImage.ts";


export const UploadImage: React.FC = () => {

    const {
        file,
        changeBg,
        setChangeBg,
        loading,
        handleFile,
        handleSubmit,
        handleClickButton
    } = useUploadImage();

    return (
        <div className='px-4'>
            {
                loading ? (<Loader/>) : (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5 items-center w-full"
                    >
                        <input
                            id='file'
                            type="file"
                            name="file"
                            onChange={handleFile}
                            className='text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100'
                        />
                        <label htmlFor='file'>
                            Solo archivos .jpg, jpeg y png de máximo 5MB.
                        </label>
                        <label htmlFor='change_bg'
                               className='text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-center gap-2'>
                            <div className='flex gap-5 text-orange-500 font-semibold text-2xl'>
                                Marca para agregar un fondo "Terrorífico"
                            </div>
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

                        <div className='flex flex-col items-center justify-center gap-4 mb-4'>
                            <div className='flex justify-center'>
                                {
                                    masks.map((mask, index) => (
                                        <label htmlFor='masks' key={index} className='flex gap-2 text-orange-500'>
                                            <input
                                                type='checkbox'
                                                name='masks'
                                                hidden={true}
                                                id={mask.public_id}
                                                value={mask.public_id}
                                                className='mr-2 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2'
                                            />
                                            <img
                                                src={mask.src}
                                                alt={mask.public_id}
                                                className='w-20 max-h-20 cursor-pointer object-contain'
                                            />
                                        </label>
                                    ))
                                }
                            </div>
                        </div>

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
                file && allowedExtensions.includes(file.type) && (
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
        </div>
    )
}