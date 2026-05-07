import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

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
