/**
 * Dynamic page renderer — `/[locale]/[slug]` resolves to a `pages` row.
 *
 * @standard schema.org WebPage
 * @standard W3C HTML5 Living Standard
 * @standard Open-Graph Protocol metadata
 * @rfc 9110 §15.4 redirection-3xx (via PayloadRedirects)
 * @compliance WCAG-2.1 level-AA
 * @see src/app/README.md
 */

import type { Metadata } from 'next'

import { PayloadRedirects } from '@/payload/redirect'
import configPromise from '@payload-config'
import type { Where } from 'payload'
import { getPayload, type RequiredDataFromCollectionSlug, type TypedLocale } from 'payload'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/seed'

import { RenderBlocks } from '@/block'
import { RenderHero } from '@/hero'
import { generateMeta } from '@/generate/meta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/live/preview/listener'
import { routing } from '@/i18n/routing'
import { resolvePublicSiteUrl } from '@/rfc/3986'
import { getTenantFromRequest } from '@/get/tenant/from/request'

const siteTenantSlug = process.env.NEXT_PUBLIC_SITE_TENANT_SLUG

export async function generateStaticParams() {
  // During build/CI, the D1 database may not have tables yet.
  // Return empty array to allow build to complete.
  if (process.env.CI || process.env.NEXT_PHASE === 'phase-production-build') {
    return []
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const tenantWhere: Where | undefined = siteTenantSlug
      ? { 'tenant.slug': { equals: siteTenantSlug } }
      : undefined

    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      ...(tenantWhere ? { where: tenantWhere } : {}),
      select: {
        slug: true,
      },
    })

    const slugParams =
      pages.docs
        ?.filter((doc) => doc.slug !== 'home')
        .map(({ slug }) => ({ slug: slug as string })) ?? []

    const params: { locale: string; slug: string }[] = []
    for (const locale of routing.locales) {
      for (const { slug } of slugParams) {
        params.push({ locale, slug })
      }
    }

    return params
  } catch {
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home', locale } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/${locale}/${decodedSlug === 'home' ? '' : decodedSlug}`.replace(/\/$/, '') || '/'

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url || '/'} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url || '/'} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home', locale } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })
  const h = await headers()
  const tenant = await getTenantFromRequest(h)
  const siteOrigin = resolvePublicSiteUrl(h, tenant)

  return generateMeta({ doc: page, siteOrigin })
}

const queryPageBySlug = cache(
  async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const slugWhere: Where = {
      slug: {
        equals: slug,
      },
    }

    const where: Where =
      siteTenantSlug !== undefined && siteTenantSlug !== ''
        ? {
            and: [
              slugWhere,
              {
                'tenant.slug': {
                  equals: siteTenantSlug,
                },
              },
            ],
          }
        : slugWhere

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      locale,
      overrideAccess: draft,
      where,
    })

    return result.docs?.[0] || null
  },
)
