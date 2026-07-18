/**
 * Locale home page — the theorem-cloud hero (aligned to payloadcms/website's Home hero pattern).
 *
 * Was a re-export of the dynamic-slug CMS template; now renders the erpax Home hero directly. The other
 * localized routes ([slug], posts, products…) still resolve through their own templates.
 *
 * @standard schema.org WebSite
 * @see ./TheoremCloud.tsx
 */

import type { Metadata } from 'next'

import TheoremCloud from './TheoremCloud'

export const metadata: Metadata = {
  title: 'erpax — the theorem cloud',
  description: 'The session’s decoded leads as a navigable cloud — ten grounded theorems around seven foundations, three refused overlays, each in 10D.',
}

export default function HomePage() {
  return <TheoremCloud />
}
