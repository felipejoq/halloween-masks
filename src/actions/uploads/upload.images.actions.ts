import {defineAction} from "astro:actions";
import {z} from "astro:schema";
import {BASE_URL, TOKEN_SECRET} from "astro:env/server";
import axios from "axios";
import type {ResponseUpload} from "../../components/uploads/responseUpload.ts";

const extensionSupported = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    return ['png', 'jpg', 'jpeg', 'gif'].includes(ext);
}

export const uploadImages = defineAction({
    accept: 'form',
    input: z.object({
        file: z.instanceof(File)
            .refine((file) => file.size < 5 * 1024 * 1024, {
                message: 'File size accepted is 5MB',
            })
            .refine(extensionSupported, {
                message: 'File extension not supported',
            }),
    }),
    handler: async ({file}) => {

        const formData = new FormData();
        formData.append('file', file);

        const response = await axios
            .post<ResponseUpload>(`${BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${TOKEN_SECRET}`
            }
        });

        return { result: response.data };
    }
});

