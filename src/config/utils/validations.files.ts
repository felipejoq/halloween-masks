export const allowedExtensions = ['image/jpg', 'image/jpeg', 'image/png'];

export const checkExtensions = (file: File) => {
    return !allowedExtensions.includes(file.type);
}

export const checkFileSize = (file: File) => {
    return file.size > 5 * 1024 * 1024;
}