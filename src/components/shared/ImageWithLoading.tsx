import React, { useState } from 'react';
import { downloadImage } from "../../config/utils.ts";

export const ImageWithLoading: React.FC<{ src: string; aspectRatio: string }> = ({ src, aspectRatio }) => {
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleRetry = () => {
        if (retryCount < 10) {
            setTimeout(() => {
                setRetryCount(retryCount + 1)
            }, 3000);
            setLoading(true);
        } else {
            // reload window
            window.location.reload();
        }
    };

    const handleDownload = async (e: React.MouseEvent, src: string) => {
        e.stopPropagation();
        setIsDownloading(true);
        await downloadImage(src);
        setIsDownloading(false);
    };

    return (
        <div className="relative" style={{ aspectRatio }}>
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <div className="animate-pulse text-4xl">🎃</div>
                    <div className="text-white text-3xl">Loading...</div>
                </div>
            )}
            <img
                src={`${src}?retry=${retryCount}`}
                alt={'Halloween masks resultado'}
                className="grayscale-[75] w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl hover:cursor-pointer hover:saturate-200 hover:grayscale-0 transition duration-300"
                loading="lazy"
                onLoad={() => setLoading(false)}
                onError={handleRetry}
            />
            {/* Download image button */}
            <button
                onClick={(e) => handleDownload(e, src)}
                className="absolute top-1 right-1 p-1"
                title="Download image"
            >
                <div className="text-xl flex justify-center gap-3 text-orange-500">
                    {
                        isDownloading ? (
                            <span className='animate-spin-slow'>⏳</span>
                        ) : (
                            <span>⬇</span>
                        )
                    }
                </div>
            </button>
        </div>
    );
};