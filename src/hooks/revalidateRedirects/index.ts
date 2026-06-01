/**
 * Redirects revalidation hook — bust the `redirects` cache tag after writes.
 *
 * @rfc 9110 §15.4 redirection-3xx
 * @rfc 9110 §13 caching
 * @rfc 9111 http-caching
 * @see docs/STANDARDS.md §4.3
 */

import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  revalidateTag('redirects', 'max')

  return doc
}
