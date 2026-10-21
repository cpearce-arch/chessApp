/// <reference types="vite/client" />

declare module 'troika-three-text/dist/troika-three-text.esm.js' {
  export function configureTextBuilder(config: { defaultFontURL?: string }): void
  export function preloadFont(
    options: { font?: string; characters?: string; sdfGlyphSize?: number },
    callback: () => void,
  ): void
}

declare module '@fontsource/inter/files/inter-latin-400-normal.woff2?url' {
  const url: string
  export default url
}
