import { ImageWithLoading } from "./ImageWithLoading.tsx";
import React, { useState } from "react";
import { downloadImage } from "@config/utils/download.image.ts";
import { toast } from "sonner";
import ImageLoadError from "@media/load-error.webp";

export const GenGallery: React.FC<{ faceMasks: string[]; aspectRatio: string }> = ({ faceMasks, aspectRatio }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleClick = (faceImage: string) => {
        setSelectedImage(faceImage);
        setShowModal(true);
    };

    const handleCloseModal = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    const handleDownload = async (e: React.MouseEvent, src: string) => {
        e.stopPropagation();
        toast.promise(downloadImage(src, setIsDownloading), {
            loading: "Descargando imagen tenebrosa... 👻",
            success: "Descarga exitosa! 🎃",
            error: "Error al descargar la imagen ❌",
            position: "top-right",
        });
    };

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {faceMasks.map((face: string, index: number) => (
                    <div onClick={() => handleClick(face)} key={index}>
                        <ImageWithLoading src={face} aspectRatio={aspectRatio} />
                    </div>
                ))}
            </div>
            {showModal && selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    onClick={handleCloseModal}
                >
                    <div className="bg-orange-500 p-4 rounded-lg max-w-full max-h-full flex flex-col items-center">
                        <img
                            src={selectedImage}
                            alt="Halloween masks resultado"
                            className="w-full max-w-lg max-h-[80vh] h-auto object-contain rounded-lg shadow-lg"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = ImageLoadError.src;
                            }}
                        />
                        {/* Download image button */}
                        <button
                            onClick={(e) => handleDownload(e, selectedImage)}
                            className="mt-4 flex justify-center gap-3 text-sm text-orange-300 bg-white hover:bg-orange-400 hover:text-white font-bold py-2 px-4 rounded"
                            title="Download image"
                        >
                            {isDownloading ? (
                                <span className="animate-spin-slow">⏳</span>
                            ) : (
                                <span className="cursor-pointer">⬇</span>
                            )}
                            ️Descargar
                        </button>
                    </div>
                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 text-2xl text-white"
                        onClick={() => setShowModal(false)}
                    >
                        <span className="text-4xl">❌</span>
                    </button>
                </div>
            )}
        </>
    );
};