/**
 * The publications index — now the posts index.
 *
 * Every publication is a post, seeded from [[publish]]/registry and read through the Payload API,
 * so this address forwards to where the content lives instead of rendering a second copy of it
 * into the build.
 *
 * @rfc 9110 http-semantics permanent-redirect
 */
import { permanentRedirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function PublicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(`/${locale}/posts`)
}
