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
