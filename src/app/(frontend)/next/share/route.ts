/**
 * GET /next/share?t=<title>&d=<description>&u=<uuid>&s=<site> — the Open Graph image of a page,
 * computed, never uploaded.
 *
 * A pure function of its query string: the SEO-plugin title and description the page already stores,
 * over the identity animation of the page's content-uuid ([[image]]/share). No Payload request, no
 * Media document, no R2 object — and the same URL always draws the same SVG, so it is cached as
 * immutable. Titles and descriptions are clipped and XML-escaped by the renderer; a `u` that is not a
 * uuid is refused rather than drawn.
 *
 * @standard OGP open-graph-protocol-1.0 og:image
 * @rfc 9110 §8.3 content-type · RFC 9111 §5.2 cache-control
 * @see src/image/share/index.ts · src/generate/meta/index.ts
 */
import { shareImage } from '@/image/share'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(request: Request): Promise<Response> {
  const q = new URL(request.url).searchParams
  const uuid = q.get('u') ?? ''
  if (!UUID.test(uuid)) return new Response('u must be a uuid', { status: 400 })
  const title = (q.get('t') ?? '').trim()
  if (!title) return new Response('t (title) is required', { status: 400 })
  const svg = shareImage({ title, description: q.get('d') ?? undefined, uuid, site: q.get('s') ?? undefined })
  return new Response(svg, {
    status: 200,
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  })
}
