/**
 * Product detail — `/[locale]/products/[slug]`.
 *
 * @standard schema.org Product
 * @standard schema.org Offer
 * @standard ISO-4217:2015 currency-codes
 * @standard GS1 GTIN global-trade-item-number
 * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data via-stripe
 * @compliance WCAG-2.1 level-AA
 * @see src/app/README.md
 */

import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import React, { cache } from 'react'

import { routing } from '@/i18n/routing'
import type { Product } from '@/payload-types'
import { generateMeta } from '@/generate/meta'
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '@/config/regional-defaults'
import { getProductPrice, formatProductPrice } from '@/product/price'
import {
  buildProductDetailWhere,
  buildPublishedProductsWhere,
} from '@/site/tenant/where'
import { resolvePublicSiteUrl } from '@/rfc/3986/get-url'
import { getTenantFromRequest } from '@/get/tenant/from/request'

export async function generateStaticParams() {
  // During build/CI, the D1 database may not have tables yet.
  // Return empty array to allow build to complete.
  if (process.env.CI || process.env.NEXT_PHASE === 'phase-production-build') {
    return []
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const products = await payload.find({
      collection: 'products',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      where: buildPublishedProductsWhere(),
      select: {
        slug: true,
      },
    })

    const slugs = products.docs.map(({ slug }) => ({ slug: slug as string }))

    const params: { locale: string; slug: string }[] = []
    for (const locale of routing.locales) {
      for (const { slug } of slugs) {
        params.push({ locale, slug })
      }
    }

    return params
  } catch {
    return []
  }
}

const queryProductBySlug = cache(
  async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'products',
      draft: false,
      limit: 1,
      locale,
      overrideAccess: false,
      pagination: false,
      where: buildProductDetailWhere(slug),
    })
    return res.docs[0] as Product | undefined
  },
)

type Args = {
  params: Promise<{
    slug: string
    locale: TypedLocale
  }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, locale } = await paramsPromise
  const product = await queryProductBySlug({ slug, locale })
  if (!product) {
    return { title: 'Product | site' }
  }
  const h = await headers()
  const tenant = await getTenantFromRequest(h)
  const siteOrigin = resolvePublicSiteUrl(h, tenant)

  return generateMeta({ doc: product, siteOrigin })
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { slug: rawSlug, locale } = await paramsPromise
  const t = await getTranslations()
  const slug = decodeURIComponent(rawSlug)
  const product = await queryProductBySlug({ slug, locale })

  if (!product) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="mb-4">
        <Link className="text-muted-foreground hover:underline" href={`/${locale}/products`}>
          ← {t('products')}
        </Link>
      </p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">{product.title}</h1>
      {(() => {
        // Currency-agnostic price display: pick whatever the storage offers,
        // format with the active locale or the canonical default.
        const price = getProductPrice(
          product as unknown as Record<string, unknown>,
          DEFAULT_CURRENCY,
        )
        const priceLocale = typeof locale === 'string' && locale.length > 0 ? locale : DEFAULT_LOCALE
        return price ? (
          <p className="mb-8 text-xl tabular-nums text-muted-foreground">
            {formatProductPrice(price, priceLocale)}
          </p>
        ) : null
      })()}
      <p className="text-muted-foreground text-sm">
        {t('product-checkout-note')}
      </p>
    </article>
  )
}
