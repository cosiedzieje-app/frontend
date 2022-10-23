/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    readonly VITE_GEO_API_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
