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
} from './cache'

export { getCachedDocument } from './get-document'
export { getCachedGlobal } from './get-globals'
export { getCachedRedirects } from './get-redirects'
