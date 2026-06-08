/**
 * medical/business — medical facet; vocabulary pivot to @/business.
 */
export const PART = 'business' as const
export const CANONICAL = 'business' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/business' as const

/** Re-export stub — canonical vocabulary at @/business. */
export const reexportFrom = '@/business' as const
