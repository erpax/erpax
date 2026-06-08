/**
 * medical/test — medical facet; vocabulary pivot to @/test.
 */
export const PART = 'test' as const
export const CANONICAL = 'test' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/test' as const

/** Re-export stub — canonical vocabulary at @/test. */
export const reexportFrom = '@/test' as const
