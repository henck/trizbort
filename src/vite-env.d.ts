/// <reference types="vite/client" />

// Handlebars template imports
declare module '*.handlebars?raw' {
  const content: string;
  export default content;
}

declare module '*.handlebars' {
  const content: string;
  export default content;
}

// Stylus imports
declare module '*.styl' {
  const content: Record<string, string>;
  export default content;
}

// SVG imports
declare module '*.svg' {
  const content: string;
  export default content;
}

// PWA virtual module
declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
    onRegisterError?: (error: any) => void;
  }

  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>;
}

// Extend Handlebars types
declare namespace Handlebars {
  let templates: Record<string, HandlebarsTemplateDelegate<any>>;
}
