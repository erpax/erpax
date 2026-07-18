import { recordOnPath } from '@/path'

export const atomPath = 'cross/index' as const
export * from '@/index/cross'
recordOnPath(atomPath, { kind: 'path-double-wire', pair: 'index/cross' })
