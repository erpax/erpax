/**
 * Search results page — `/[locale]/search?q=...`.
 *
 * @standard schema.org SearchResultsPage
 * @standard schema.org SearchAction
 * @rfc 3986 uniform-resource-identifier query-component
 * @compliance WCAG-2.1 level-AA
 * @see src/app/README.md
 */

import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/collection/archive'
import configPromise from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { getPayload, type TypedLocale } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from '@/app/(frontend)/[locale]/search/page.client'
import { CardPostData } from '@/card'

type Args = {
  params: Promise<{ locale: TypedLocale }>
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { locale } = await paramsPromise
  const t = await getTranslations()
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    locale,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">{t('searchLabel')}</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as unknown as CardPostData[]} />
      ) : (
        <div className="container">{t('no-results')}</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Search',
  }
}
