/**
 * medical/procedure — medical facet; vocabulary pivot to @/procedure.
 */
export const PART = 'procedure' as const
export const CANONICAL = 'procedure' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/procedure' as const

/** @index-cross.foldback child=medical/procedure parent=medical — this cross folds back into its parent. */
