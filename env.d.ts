/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly BACKEND_URL: string;
    readonly POSITIONSTACK_API_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}