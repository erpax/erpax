import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import type { Where } from 'payload'
import { getPayload, type RequiredDataFromCollectionSlug, type TypedLocale } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { RenderHero } from '@/components/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { routing } from '@/i18n/routing'

const siteTenantSlug = process.env.NEXT_PUBLIC_SITE_TENANT_SLUG

export async function generateStaticParams() {
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

  return generateMeta({ doc: page })
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
