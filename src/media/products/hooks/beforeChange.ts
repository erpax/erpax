import type { CollectionConfig } from 'payload'

import { importRemoteMediaProductsHook } from '@/remote/media/import'

/**
 * Ecommerce default `beforeChange` hooks plus remote media import for product gallery.
 *
 * @standard schema.org Product
 * @rfc 3986 uri remote-media-source
 * @rfc 6838 mime-type media-type
 * @standard ISO-4217:2015 currency-codes
 * @see docs/STANDARDS.md §3
 */
export function productsBeforeChange(
  defaultCollection: CollectionConfig,
): NonNullable<CollectionConfig['hooks']>['beforeChange'] {
  const prev = defaultCollection.hooks?.beforeChange
  const existing = Array.isArray(prev) ? prev : prev ? [prev] : []
  return [...existing, importRemoteMediaProductsHook]
}
