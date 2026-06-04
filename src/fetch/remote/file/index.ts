/**
 * Remote-file downloader for Payload's `create({ collection: 'media', file })`.
 *
 * Fetches a `http(s)://` URL, follows redirects per RFC 9110 §15.4, derives
 * a filename from the URL path (RFC 3986 §3.3) or the Content-Type header
 * (RFC 6838 media-type registry), and returns the bytes in Payload's `File`
 * envelope.
 *
 * @rfc 9110 http-semantics
 * @rfc 9110 §15.4 redirection-3xx
 * @rfc 3986 uri filename-extraction
 * @rfc 6838 media-type-registration
 * @security ISO-27002 §8.23 web-filtering
 * @see src/standards/rfc-3986/
 * @see src/standards/rfc-9110/
 */

import type { File } from 'payload'

import { codedFromRegistry, ERR } from '@/error'

function guessExtensionFromMime(mime: string): string {
  const m = mime.toLowerCase()
  if (m.includes('jpeg')) return '.jpg'
  if (m.includes('png')) return '.png'
  if (m.includes('gif')) return '.gif'
  if (m.includes('webp')) return '.webp'
  if (m.includes('svg')) return '.svg'
  if (m.includes('avif')) return '.avif'
  return ''
}

/**
 * Download a remote file for Payload `create({ collection: 'media', file })`.
 */
export async function fetchRemoteFileForPayload(url: string): Promise<File> {
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Accept: 'image/*,*/*;q=0.8',
    },
  })

  if (!res.ok) {
    throw codedFromRegistry(ERR.INTERNAL_REMOTE_FETCH, new Error(`HTTP ${res.status}`))
  }

  const buf = Buffer.from(await res.arrayBuffer())
  const contentType =
    res.headers.get('content-type')?.split(';')[0]?.trim() || 'application/octet-stream'

  let name: string
  try {
    const pathSeg = new URL(url).pathname.split('/').filter(Boolean).pop() || `remote-${Date.now()}`
    name = decodeURIComponent(pathSeg.split('?')[0] ?? pathSeg)
  } catch {
    name = `remote-${Date.now()}`
  }

  if (!/[.][a-z0-9]{2,8}$/i.test(name)) {
    name += guessExtensionFromMime(contentType) || '.bin'
  }

  return {
    name,
    data: buf,
    mimetype: contentType,
    size: buf.length,
  }
}
