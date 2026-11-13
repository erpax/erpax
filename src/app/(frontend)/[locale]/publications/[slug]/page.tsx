/**
 * One publication — now one post.
 *
 * The result is a row in `posts`, based on the nested page of the atom it reports on, so this
 * address forwards to the post instead of rendering the registry into the build.
 *
 * @rfc 9110 http-semantics permanent-redirect
 */
import { permanentRedirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function PublicationPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  permanentRedirect(`/${locale}/posts/${slug}`)
}
