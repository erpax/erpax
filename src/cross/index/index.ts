import { recordOnPath } from '@/path'

export const atomPath = 'cross/index' as const
export * from '@/index/cross'
recordOnPath(atomPath, { kind: 'path-double-wire', pair: 'index/cross' })

/** @index-cross.foldback child=cross/index parent=cross — this cross folds back into its parent. */
