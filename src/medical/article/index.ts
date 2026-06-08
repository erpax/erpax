/**
 * medical/article — medical facet; vocabulary pivot to @/article.
 */
export const PART = 'article' as const
export const CANONICAL = 'article' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/article' as const

/** Re-export stub — canonical vocabulary at @/article. */
export const reexportFrom = '@/article' as const
