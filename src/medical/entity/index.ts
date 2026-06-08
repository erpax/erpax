/**
 * medical/entity — medical facet; vocabulary pivot to @/entity.
 */
export const PART = 'entity' as const
export const CANONICAL = 'entity' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/entity' as const

/** Re-export stub — canonical vocabulary at @/entity. */
export const reexportFrom = '@/entity' as const
