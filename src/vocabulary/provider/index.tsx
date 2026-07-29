/**
 * App-wide React context providers — header-theme + color-theme.
 *
 * Folded literary twin of `@/provider` (same contentUuid). Live React face
 * stays at `src/provider` — re-export so the client-seal fix cannot drift.
 *
 * @compliance WCAG-2.1 §1.4.3 contrast-minimum
 * @compliance WCAG-2.1 §1.4.11 non-text-contrast
 * @standard W3C CSS-Color-4 color-contrast
 * @see src/components/README.md
 */

export { Providers } from '@/provider'
