export type Theme = 'dark' | 'light'

/**
 * ONE key, read from the provider that owns it — this file declared `'payload-theme'` a second time.
 *
 * Two literals for the key that persists the theme is the drift class ([[rules]]/drift): change one
 * and the selector writes a preference the provider never reads, so the toggle appears to work and
 * the choice is forgotten on reload. Nothing errors, and nothing can tell you which of the two is
 * the real one. Found by writing this atom's proof.
 */
export { themeLocalStorageKey } from '@/providers/theme/shared'

export { defaultTheme } from '@/providers/theme/shared'
