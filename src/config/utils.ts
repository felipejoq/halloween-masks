export const downloadImage = async (src: string) => {
    // Extract filename and extension from URL
    const url = new URL(src);
    const pathname = url.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);

    return fetch(src)
        .then((response) => response.blob())
        .then((blob) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `${filename}.jpg`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        });
}

export interface Mask {
    public_id: string;
    src: string;
}

export const masks: Mask[] = [
    {public_id: 'masks:mask_1', src: "https://res.cloudinary.com/dzwgql0ie/image/upload/v1728763807/masks/mask_1.png"},
    {public_id: 'masks:mask_2', src: "https://res.cloudinary.com/dzwgql0ie/image/upload/v1728698903/masks/mask_2.webp"},
    {public_id: 'masks:mask_3', src: "https://res.cloudinary.com/dzwgql0ie/image/upload/v1728698904/masks/mask_3.png"},
    {public_id: 'masks:mask_4', src: "https://res.cloudinary.com/dzwgql0ie/image/upload/v1729092637/masks/mask_4.webp"},
    {public_id: 'masks:mask_5', src: "https://res.cloudinary.com/dzwgql0ie/image/upload/v1728698907/masks/mask_5.webp"},
];