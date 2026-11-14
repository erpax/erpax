import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Post } from '@/types'

/**
 * Posts cache-revalidation hook — fires after publish/unpublish to bust ISR.
 *
 * @rfc 9110 §13 caching
 * @rfc 9111 http-caching
 * @standard W3C HTML5 Living Standard
 * @see docs/STANDARDS.md §4.3
 */
export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (process.env.VITEST) {
    return doc
  }
  const { revalidatePath, revalidateTag } = await import('next/cache')

  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('posts-sitemap', 'max')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({ doc, req: { context } }) => {
  if (process.env.VITEST) {
    return doc
  }
  const { revalidatePath, revalidateTag } = await import('next/cache')

  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('posts-sitemap', 'max')
  }

  return doc
}
