/**
 * The breakpoint widths, in one place — see ./SKILL.md.
 *
 * @standard W3C CSS Media Queries Level 4 — width breakpoints
 */

/** Keep in sync with the Tailwind configuration's screen widths. */
export const cssVariables = {
  breakpoints: {
    '3xl': 1920,
    '2xl': 1536,
    xl: 1280,
    lg: 1024,
    md: 768,
    sm: 640,
  },
} as const
