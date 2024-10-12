/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
    readonly BASE_URL: string;
    readonly TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}