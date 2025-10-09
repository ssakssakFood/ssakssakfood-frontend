/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_REST_API_KEY: string;
  // 다른 env 변수도 여기 추가 가능
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
