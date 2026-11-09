interface ImportMetaEnv {
  /** OAuth 2.0 Web client id from Google Cloud Console; without it the login page runs in preview mode */
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
