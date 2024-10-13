import {uploadImages} from "./uploads/upload.images.actions.ts";
import {getPostByPublicId} from "./posts/post.images.action.ts";

export const server = {
    uploadImages,
    getPostByPublicId
}