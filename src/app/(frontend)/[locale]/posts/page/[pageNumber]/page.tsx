/**
 * Posts archive paginated — `/[locale]/posts/page/[pageNumber]`.
 *
 * @standard schema.org CollectionPage
 * @rfc 5005 web-feed-paging-and-archiving
 * @rfc 3986 uniform-resource-identifier page-number-segment
 * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
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
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber, locale } = await paramsPromise
  const t = await getTranslations()
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    locale,
    overrideAccess: false,
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
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  // During build/CI, the D1 database may not have tables yet.
  // Return empty array to allow build to complete.
  if (process.env.CI || process.env.NEXT_PHASE === 'phase-production-build') {
    return []
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const { totalDocs } = await payload.count({
      collection: 'posts',
      overrideAccess: false,
    })

    const totalPages = Math.ceil(totalDocs / 12)

    const pages: { locale: string; pageNumber: string }[] = []

    for (const locale of routing.locales) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push({ locale, pageNumber: String(i) })
      }
    }

    return pages
  } catch {
    return []
  }
}
