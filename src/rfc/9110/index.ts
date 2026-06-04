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
} from '@/rfc/9110/cache'

export { getCachedDocument } from '@/rfc/9110/get-document'
export { getCachedGlobal } from '@/rfc/9110/get-globals'
export { getCachedRedirects } from '@/rfc/9110/get-redirects'
