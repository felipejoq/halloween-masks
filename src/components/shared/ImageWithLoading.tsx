import React, { useState } from 'react';

export const ImageWithLoading: React.FC<{ src: string; }> = ({ src }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="w-4/5 sm:w-3/2 xl:w-1/4 flex justify-center relative aspect-w-1 aspect-h-1" style={{ aspectRatio: '1 / 1' }}>
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 aspect-w-1 aspect-h-1">
                    <div className="animate-pulse text-4xl">🎃</div>
                    <div className="text-white text-3xl">Loading...</div>
                </div>
            )}
            <img
                src={src}
                alt={'Halloween masks resultado'}
                className="w-full h-full object-cover"
                loading="lazy"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </div>
    );
};