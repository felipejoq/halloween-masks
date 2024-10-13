import {defineAction, ActionError} from "astro:actions";
import {z} from "astro:schema";
import axios from "axios";
import type {ResponseUpload} from "../../components/uploads/ResponseUpload.ts";
import {BASE_URL, TOKEN_SECRET} from "astro:env/server";

export const getPostByPublicId = defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (public_id) => {

        let response

        try {
            response = await axios
                .get<ResponseUpload>(`${BASE_URL}/post-images/${public_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${TOKEN_SECRET}`
                    }
                });
        } catch (error) {
            throw new ActionError({
                message: `Internal server error - ${error}`,
                code: 'INTERNAL_SERVER_ERROR'
            });
        }

        // preflight check if the image exists on cloudinary
        if (response.status === 200) {
            try {
                await axios.head(`${response.data.secure_url}`);
            } catch (error) {
                throw new ActionError({
                    message: `Post not found - ${error}`,
                    code: 'NOT_FOUND'
                });
            }
        }

        return {result: response.data};
    }
});