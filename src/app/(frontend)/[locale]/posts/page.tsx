/**
 * Posts archive index — `/[locale]/posts` lists published posts.
 *
 * @standard schema.org Blog
 * @standard schema.org CollectionPage
 * @standard schema.org ItemList
 * @rfc 5005 web-feed-paging-and-archiving
 * @compliance WCAG-2.1 level-AA
 * @see src/app/README.md
 */

import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/collection/archive'
import { PageRange } from '@/page/range'
import { Pagination } from '@/pagination'
import configPromise from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { getPayload, type TypedLocale } from 'payload'
import React from 'react'
import PageClient from './page.client'

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

/** Avoid prerender at build: CI D1 often has no schema until `payload migrate` runs after build. */
export const dynamic = 'force-dynamic'

export default async function Page({ params: paramsPromise }: Args) {
  const { locale } = await paramsPromise
  const t = await getTranslations()
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    locale,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{t('posts.plural')}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Posts',
  }
}
