/**
 * identity — sequence 0 (axis): content-addressed identity + federation/merge.
 *
 * The face `@erpax/identity` ships. Composes the two atoms that ARE identity:
 *   @/uuid   uuidPlugin — injects the content-uuid field + compute hook into
 *            every collection (same content ⇒ same id everywhere)
 *   @/merge  the fold — canonical form, chain leaves, foldToRoot, bind4,
 *            signatures: how two stores holding the same content become one
 *
 * Local WORD/atomPath name THIS atom and shadow merge's star-exported atomPath.
 */
export const WORD = 'identity' as const
export const atomPath = 'identity' as const

export * from '@/uuid'
export * from '@/merge'
