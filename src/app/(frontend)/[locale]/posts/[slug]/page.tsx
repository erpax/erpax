/**
 * Post detail page — `/[locale]/posts/[slug]` renders a single article.
 *
 * @standard schema.org Article
 * @standard schema.org BlogPosting
 * @standard Open-Graph Protocol article-metadata
 * @standard ISO-8601-1:2019 date-time published-at
 * @standard BCP-47 language-tag
 * @compliance WCAG-2.1 level-AA
 * @see src/app/README.md
 */

import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/related/post/Component'
import { PayloadRedirects } from '@/payload/redirect'
import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/rich/text'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/post/hero'
import { generateMeta } from '@/generate/meta'
import PageClient from '@/app/(frontend)/[locale]/posts/[slug]/page.client'
import { LivePreviewListener } from '@/live/preview/listener'
import { routing } from '@/i18n/routing'
import type { SupportedLocale } from '@/i18n/localization'
import { resolvePublicSiteUrl } from '@/rfc/3986/get-url'
import { getTenantFromRequest } from '@/get/tenant/from/request'

export async function generateStaticParams() {
  // During build/CI, the D1 database may not have tables yet.
  // Return empty array to allow build to complete; pages will be
  // dynamically rendered on first request (ISR-style).
  if (process.env.CI || process.env.NEXT_PHASE === 'phase-production-build') {
    return []
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    const slugParams =
      posts.docs.map(({ slug }) => ({
        slug: slug as string,
      })) ?? []

    const params: { locale: string; slug: string }[] = []
    for (const locale of routing.locales) {
      for (const { slug } of slugParams) {
        params.push({ locale, slug })
      }
    }

    return params
  } catch {
    // If DB query fails (e.g., no such table), return empty array
    // Pages will be dynamically rendered
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
    locale: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', locale: localeParam } = await paramsPromise
  const locale = localeParam as SupportedLocale
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = `/${locale}/posts/${decodedSlug}`
  const post = await queryPostBySlug({ slug: decodedSlug, locale })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale: localeParam } = await paramsPromise
  const locale = localeParam as SupportedLocale
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug, locale })
  const h = await headers()
  const tenant = await getTenantFromRequest(h)
  const siteOrigin = resolvePublicSiteUrl(h, tenant)

  return generateMeta({ doc: post, siteOrigin })
}

const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
