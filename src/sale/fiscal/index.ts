/**
 * sale/fiscal — the barrel. Matter lives in the child atoms; a hub re-exports and holds none itself.
 *
 * @see ./SKILL.md
 */
export * from './context'
export * from './receipt'
export * from './reference'
export * from './revenue'

/** @index-cross.foldback child=sale/fiscal parent=sale — this cross folds back into its parent. */
