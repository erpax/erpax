/**
 * Open Graph default-merger for Next.js page metadata.
 *
 * @standard OGP open-graph-protocol-1.0
 * @standard W3C-HTML5 §4.2.5 meta-element
 * @rfc 3986 §5.3 reference-resolution
 * @see src/standards/rfc-3986/
 */

import type { Metadata } from 'next'
import { getServerSideURL } from '@/standards/rfc-3986/get-url'

const buildDefaultOpenGraph = (siteOrigin?: string): Metadata['openGraph'] => {
  const base = siteOrigin ?? getServerSideURL()
  return {
    type: 'website',
    description: 'An open-source website built with Payload and Next.js.',
    images: [
      {
        url: `${base}/website-template-OG.webp`,
      },
    ],
    siteName: 'Payload Website Template',
    title: 'Payload Website Template',
  }
}

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
  siteOrigin?: string,
): Metadata['openGraph'] => {
  const defaultOpenGraph = buildDefaultOpenGraph(siteOrigin)
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
