/**
 * medical/folder — medical facet; vocabulary pivot to @/folder.
 */
export const PART = 'folder' as const
export const CANONICAL = 'folder' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/folder' as const

/** Re-export stub — canonical vocabulary at @/folder. */
export const reexportFrom = '@/folder' as const

/** @index-cross.foldback child=medical/folder parent=medical — this cross folds back into its parent. */
