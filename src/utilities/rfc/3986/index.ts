/**
 * Public surface of the RFC 3986 standards module.
 *
 * @rfc 3986 uniform-resource-identifier
 */
export {
  normalizeUrl,
  buildOrigin,
  safeParseUrl,
  getUrlOrigin,
  ensureProtocol,
  joinUrl,
  resolvePublicSiteUrl,
} from '@/utilities/rfc/3986/url-utils'

export {
  getOriginFromHeaders,
  getServerSideURL,
  getClientSideURL,
  resolvePublicSiteUrl as resolvePublicSiteUrlFromHeaders,
  type ServerOriginOptions,
} from '@/utilities/rfc/3986/get-url'

export { generatePreviewPath } from '@/utilities/rfc/3986/generate-preview-path'
