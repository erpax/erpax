/**
 * Public surface of the RFC 9110 standards module.
 *
 * @rfc 9110 §13 caching
 */
export {
  createCachedPayloadFetcher,
  getCachedPayloadDocument,
  getCachedPayloadGlobal,
  getCachedPayloadCollection,
  getCachedPayloadCollectionAll,
  getCachedPayloadById,
  getCachedPayloadLocalizedDocument,
} from '@/utilities/rfc/9110/cache'

export { getCachedDocument } from '@/utilities/rfc/9110/get/document'
export { getCachedGlobal } from '@/utilities/rfc/9110/get/globals'
export { getCachedRedirects } from '@/utilities/rfc/9110/get/redirects'
