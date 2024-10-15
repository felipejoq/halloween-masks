import {defineAction} from "astro:actions";
import {z} from "astro:schema";
import {BASE_URL, TOKEN_SECRET} from "astro:env/server";
import axios from "axios";
import type {ResponseUpload} from "../../components/uploads/ResponseUpload.ts";

const extensionSupported = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    return ['png', 'jpg', 'jpeg'].includes(ext);
}

export const uploadImages = defineAction({
    accept: 'form',
    input: z.object({
        file: z.instanceof(File)
            .refine((file) => file.size < 10 * 1024 * 1024, {
                message: 'La imagen debe pesar máximo 10MB',
            })
            .refine(extensionSupported, {
                message: 'Las extensiones permitidas son: png, jpg, jpeg',
            }),
        change_bg: z.boolean().optional()
    }),
    handler: async ({file, change_bg}) => {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('change_bg', change_bg ? 'true' : '');

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

