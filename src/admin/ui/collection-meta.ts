/**
 * admin/ui/collection-meta — atom path · horo · seal from collection config.
 */
import { accountCodeOf } from '@/accounting'
import { COLLECTION_DIAMOND_KEY } from '@/factory/collection-factory'
import type { CollectionConfig } from 'payload'
import { nodeOf } from '@/uuid/matrix'

export interface ErpaxCollectionMeta {
  readonly atomPath: string
  readonly accountCode: string
  readonly horo: number | null
  readonly sealed: boolean
}

export function erpaxMetaOf(collection: CollectionConfig): ErpaxCollectionMeta {
  const diamond = (collection as Record<string, unknown>)[COLLECTION_DIAMOND_KEY] as
    | { atomPath?: string; horo?: number | null; sealed?: boolean }
    | undefined
  const atomPath = diamond?.atomPath ?? collection.slug.replace(/-/g, '/')
  const node = nodeOf(atomPath)
  return {
    atomPath,
    accountCode: accountCodeOf(atomPath),
    horo: diamond?.horo ?? node?.horo ?? null,
    sealed: diamond?.sealed ?? false,
  }
}

export const ERPAX_LIST_COLUMNS: readonly string[] = [
  'erpaxPathAccount',
  'erpaxSeal',
  'erpaxHoro',
]
