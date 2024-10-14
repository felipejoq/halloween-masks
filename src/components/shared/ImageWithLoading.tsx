import React, { useState } from 'react';

export const ImageWithLoading: React.FC<{ src: string; aspectRatio: string }> = ({ src, aspectRatio }) => {
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    const handleRetry = () => {
        if( retryCount < 3 ) {
            setLoading(true);
            setRetryCount(retryCount + 1);
        }
    };

    return (
        <div className="w-4/5 sm:w-3/2 xl:w-2/5 flex justify-center relative" style={{ aspectRatio }}>
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <div className="animate-pulse text-4xl">🎃</div>
                    <div className="text-white text-3xl">Loading...</div>
                </div>
            )}
            <img
                src={`${src}?retry=${retryCount}`}
                alt={'Halloween masks resultado'}
                className="w-full h-full object-cover"
                loading="lazy"
                onLoad={() => setLoading(false)}
                onError={handleRetry}
            />
        </div>
    );
};