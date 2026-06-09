import { APP_COLLECTION_SLUGS } from './appCollections'
export { APP_COLLECTION_SLUGS }
export type { AppCollectionSlug } from './appCollections'
export const volume = 'config' as const
export const atomPath = 'config' as const
export function collectionCount(): number { return APP_COLLECTION_SLUGS.length }
