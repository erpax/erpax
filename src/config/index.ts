import { APP_COLLECTION_SLUGS } from './collections'
export { APP_COLLECTION_SLUGS }
export type { AppCollectionSlug } from './collections'
export const volume = 'config' as const
export const atomPath = 'config' as const
export function collectionCount(): number { return APP_COLLECTION_SLUGS.length }
