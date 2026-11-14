/**
 * Processes media resource URL to ensure proper formatting.
 *
 * Local paths (e.g. `/api/media/file/image.webp`) are kept relative so
 * Next.js image optimization treats them as local rather than fetching
 * through `remotePatterns`, which blocks private IPs since Next.js 16.
 *
 * The cache-tag is percent-encoded per RFC 3986 §2.1 before being appended
 * as a query string per RFC 3986 §3.4.
 *
 * @rfc 3986 §2.1 percent-encoding
 * @rfc 3986 §3.4 query-component
 *
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  return cacheTag ? `${url}?${cacheTag}` : url
}
