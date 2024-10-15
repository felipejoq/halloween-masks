/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
    readonly BASE_URL: string;
    readonly TOKEN_SECRET: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}